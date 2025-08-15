import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/appcontext';
import { assets } from "../assets/assets"
import "../Styles/login.css"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify";
import axios from "axios";

const Login = () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = BackendUrl;
  const {BackendUrl,setisloggedin,getuserdata,userdata} = useContext(AppContext);
  const navigate = useNavigate();
  const[name , setname] = useState('');
  const[email , setemail] = useState('');
  const[password,setpassword] = useState('');
  const [state, setstate] = useState('login');
  const onSubmithandler=async(e)=>{
      try{
         e.preventDefault();
         if(state === 'signup'){
          const {data} = await axios.post(BackendUrl+'/api/auth/register',{
            name , email , password
           });
           if(data.success){
            setisloggedin(true);
            toast.success(data.message);
            await getuserdata();
            navigate('/');
           }else{
            toast.error(data.message);
           }
         }
         else{
          const {data} = await axios.post(BackendUrl+'/api/auth/login',{
            email , password
           });
           if(data.success){
            setisloggedin(true);
            toast.success(data.message);
            await getuserdata();
            navigate('/');
           }else{
            toast.error(data.message);
           }
         }
      }
      catch(error){
        toast.error(error.response?.data?.message || "Something went wrong");
      }
  }
  return (
    <div className='parent min-h-screen px-6 sm:px-0 bg-gradient-to-br 
      from-blue-200 to-purple-400'>
      <div className="upper">
        <img src={assets.logo} alt="" className='logoicon'   onClick={() => navigate('/')} />
      </div>
      <div className="lower bg-slate-900 rounded-lg shadow-lg text-indigo-300 text-sm">
        <h2>{state === 'signup' ? " Create Account " :
          " Login Account "}</h2>
        <p>{state === 'signup' ? " Create Your Account " :
          " Login to Your Account "}</p>
        <form onSubmit={onSubmithandler}>
          {  
            state === 'login' ? <></> :
              <div className="formdiv rounded-full bg-[#33385C]">
                <img src={assets.person_icon} alt="" />
                <input onChange={ e => setname(e.target.value)} value={name} type="text" placeholder='Full Name ' required />
              </div>
          }
          <div className="formdiv rounded-full bg-[#33385C]">
            <img src={assets.mail_icon} alt="" />
            <input onChange={ e => setemail(e.target.value)}  value={email} type="email" placeholder='Enter Email  ' required />
          </div>
          <div className="formdiv rounded-full bg-[#33385C]">
            <img src={assets.lock_icon} alt="" />
            <input onChange={ e => setpassword(e.target.value)} value={password} type="password" placeholder='Password' required />
          </div>
          {
            state === 'signup' ? <></> : <p
              onClick={() => navigate('/reset-password')} className='text-indigo-500 
            cursor-pointer'  > Forgot Password</p>
          }
          <button className='rounded-full bg-gradient-to-r 
          from-indigo-500 to-indigo-900 text-white font-medium'
          >
            {state === 'signup' ? "Sign Up" : "Log In"}</button>
        </form>
        {state === 'signup' ?
          <p className='last text-center '> Already have Account?
            <span onClick={() => setstate('login')} className='text-blue-400 
            cursor-pointer underline' >   Login Here </span>
          </p>
          :
          <p className='last text-center '> Doesnot have account?
            <span onClick={() => setstate('signup')} className='text-blue-400 
            cursor-pointer underline' >   Sign Up </span>
          </p>
        }
      </div>
    </div>
  )
}

export default Login
