import express from "express"
import {register , login , logout ,sendverifyotp , verifyOtp, 
isauthenticated, resetpassword , resetpasswordotp} from "../Controllers/authcontroller.js"
import userauth from "../Middleware/userauth.js";
const authrouter = express.Router();

authrouter.post('/register',register)

authrouter.post('/login',login)

authrouter.post('/logout',logout)

authrouter.post('/sendverifyotp',userauth,sendverifyotp);

authrouter.post('/verifyotp',userauth,verifyOtp);

authrouter.post('/is-auth',userauth,isauthenticated);

authrouter.post('/sendpassresetotp',resetpasswordotp);

authrouter.post('/sendverifyresetotp',resetpassword);


export default authrouter;