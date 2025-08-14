import express from "express"
import { getuserdata } from "../Controllers/usercontroller.js"
import userauth from "../Middleware/userauth.js";
const userrouter = express.Router();

userrouter.get('/data',userauth,getuserdata);

export default userrouter;