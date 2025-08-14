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

const allowedOrigins = [
  'http://localhost:5173',
  'https://auth-mern-application-ui.vercel.app'
];


app.use( express.json());
app.use( cookieParser());

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin like mobile apps or Postman
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));



app.get("/",(req,res)=>{
    res.send("API Working Fine");
})

app.use('/api/auth',authrouter);
app.use('/api/user',userrouter);

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});


