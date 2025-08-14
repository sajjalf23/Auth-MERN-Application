import express from "express"
import cors from "cors"
import 'dotenv/config';
import cookieParser from "cookie-parser";
import authrouter  from "./Routes/authroutes.js";
import userrouter  from "./Routes/userroutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

import connectdb from "./config/mongodb.js"
connectdb();

const allowedorigins =['http://localhost:5173'];

app.use( express.json());
app.use( cookieParser());
app.use(cors({ credentials : true ,
     origin :  allowedorigins
 }));


app.get("/",(req,res)=>{
    res.send("API Working Fine");
})

app.use('/api/auth',authrouter);
app.use('/api/user',userrouter);

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});


