import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usermodel from "../Models/usermodel.js"
import transporter from "../config/nodemailer.js"
import {EMAIL_VERIFY_TEMPLATE , PASSWORD_RESET_TEMPLATE , REGISTER_TEMPLATE} from "../config/emailTemplate.js";


export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, email, and password) are required.",
        });
    }
    try {
        const existinguser = await usermodel.findOne({ email });
        if (existinguser) {
            return res.status(409).json({ success: false, message: "Email already registered" })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new usermodel({
            name, email,
            password: hashedpassword,
        })

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "WELCOME TO AUTHENTICATION APP",
            html : REGISTER_TEMPLATE.replace("{{email}}",email)
        }

        await transporter.sendMail(mailOptions);

        return res.status(201).json({
            success: true,
            message: `${name} is registered successfully`
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields (email and password) are required.",
        });
    }

    try {
        const user = await usermodel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email is not registered. Please register it first.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password.",
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: `${user.name} is logged in successfully`,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        })

        return res.status(200).json({
            success: true,
            message: "Logged out",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const sendverifyotp = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await usermodel.findById(userId);
        if (user === null) {
            return res.status(400).json({
                success: false,
                message: "Email doesnot exist",
            });
        }
        if (user.isverified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified",
            });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const hashedOtp = await bcrypt.hash(otp, 10);
        user.verifyOtp = hashedOtp;
        user.verifyOtpExpAt = Date.now() + 10 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "ACCOUNT VERIFICATION OTP",
            html : EMAIL_VERIFY_TEMPLATE.replace("{{otpCode}}",otp)
        }
        await transporter.sendMail(mailOptions);
        return res.status(200).json({
            success: true,
            message: "OTP is sent",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    if (!otp) {
        return res.status(400).json({
            success: false,
            message: "Enter all details (OTP) ",
        });
    }
    try {
        const userId = req.userId;
        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email doesnot exist",
            });
        }
        if (user.isverified) {
            return res.status(400).json({
                success: false,
                message: "Email is Already Verified",
            });
        }
        if (user.verifyOtpExpAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }

        const isOtpMatch = await bcrypt.compare(otp, user.verifyOtp);
        if (!user.verifyOtp || !isOtpMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        user.isverified = true;
        user.verifyOtp = "";
        user.verifyOtpExpAt = 0;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "OTP is Verified"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

export const isauthenticated = async (req, res) => {
    try {

        return res.status(200).json({
            success: true,
            message: "Authenticated",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const resetpasswordotp = async (req, res) => {
    const {email} = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Enter all details (Email)",
        });
    }
    try {
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email doesnot exist",
            });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const hashedOtp = await bcrypt.hash(otp, 10);
        user.resetOtp = hashedOtp;
        user.resetOtpExpAt = Date.now() + 10 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Reset Password OTP",
            html : PASSWORD_RESET_TEMPLATE.replace("{{otpCode}}",otp)
        }
        await transporter.sendMail(mailOptions);
        return res.status(200).json({
            success: true,
            message: "Reset Password OTP is sent",
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const resetpassword = async (req, res) => {
    const { email, newpassword, otp } = req.body;
    if (!email || !newpassword || !otp) {
        return res.status(400).json({
            success: false,
            message: "Enter all details (Email , Password , OTP)",
        });
    }
    try {
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email doesnot exist",
            });
        }
        if (user.resetOtpExpAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }
        const isOtpMatch = await bcrypt.compare(otp, user.resetOtp);
        if (!user.resetOtp || !isOtpMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }
        user.resetOtp = "";
        user.resetOtpExpAt = 0;
        const newp = await bcrypt.hash(newpassword, 10);
        user.password = newp;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully."
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
