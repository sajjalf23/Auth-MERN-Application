import React, { useContext, useState, useRef } from 'react';
import { AppContext } from '../Context/appcontext';
import { assets } from "../assets/assets";
import "../Styles/resetpassword.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Resetpassword = () => {
  axios.defaults.withCredentials = true;
  const { BackendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    updateOtpValue();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    updateOtpValue();
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();
    paste.split("").forEach((char, index) => {
      if (inputRefs.current[index]) inputRefs.current[index].value = char;
    });
    updateOtpValue();
  };

  const updateOtpValue = () => {
    const otp = inputRefs.current.map(input => input.value || "").join("");
    setOtpValue(otp);
  };

  const handleNextStep = async (e) => {
    e.preventDefault();

    if (step === 1) {
      try {
        const { data } = await axios.post(`${BackendUrl}/api/auth/sendpassresetotp`, { email });
        if (data.success) {
          toast.success(data.message);
          setStep(2); 
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } else if (step === 2) {
      if (otpValue.length !== 6) {
        toast.error("Please enter a 6-digit OTP");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!newPassword) {
        toast.error("Please enter a new password");
        return;
      }
      try {
        const { data } = await axios.post(`${BackendUrl}/api/auth/sendverifyresetotp`, {
          email,
          otp: otpValue,
          newpassword: newPassword
        });
        if (data.success) {
          toast.success(data.message);
          setStep(1);
          setEmail("");
          setOtpValue("");
          setNewPassword("");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="parent min-h-screen px-6 sm:px-0 bg-gradient-to-br 
      from-blue-200 to-purple-400">
      <div className="upper mb-4">
        <img src={assets.logo} alt="" className="logoicon cursor-pointer" onClick={() => navigate("/")} />
      </div>

      <div className="lower bg-slate-900 rounded-lg shadow-lg text-indigo-300 text-sm p-6 w-full max-w-md transition-all duration-500">
        <h2 className="text-center text-xl font-semibold mb-2">Reset Password</h2>
        <p className="text-center mb-4">
          {step === 1 && "Enter Your Registered Email"}
          {step === 2 && "Enter the OTP sent to your email"}
          {step === 3 && "Enter your new password"}
        </p>

        <form onSubmit={handleNextStep}>
          {step === 1 && (
            <div className="formdiv rounded-full bg-[#33385C] flex items-center gap-2 px-3 py-2">
              <img src={assets.mail_icon} alt="" className="w-5 h-5" />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="bg-transparent flex-1 text-white outline-none"
              />
            </div>
          )}

          {step === 2 && (
            <div className="otpdiv flex gap-2 my-4 justify-center" onPaste={handlePaste}>
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={el => (inputRefs.current[index] = el)}
                  onInput={e => handleInput(e, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                  required
                />
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="formdiv rounded-full bg-[#33385C] flex items-center px-3 py-2">
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                className="bg-transparent flex-1 text-white outline-none"
              />
            </div>
          )}

          <button className="rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium px-4 py-2 mt-4 w-full">
            {step === 1 ? "Send OTP" : step === 2 ? "Next" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;

