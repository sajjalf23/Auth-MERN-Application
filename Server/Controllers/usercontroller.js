import usermodel from "../Models/usermodel.js"

export const getuserdata = async(req,res)=>{
    try{
        const userId = req.userId;
        const user = await usermodel.findById(userId);
        if(!user){
            return res.status(400).json({ success: false, message: "User not found" });
        }
        return  res.status(200).json({ success: true, message: "User data sent" , data :{
            name : user.name , email : user.email , isAccountverified : user.isverified 
        } });
    }
    catch(error){
        return res.status(500).json({ success: false, message: error.message });
    }
}
