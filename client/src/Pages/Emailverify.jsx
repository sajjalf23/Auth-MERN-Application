import React, { useContext ,useEffect } from 'react';
import { AppContext } from '../Context/appcontext';
import { assets } from '../assets/assets';
import '../Styles/emailverify.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Emailverify = () => {
  axios.defaults.withCredentials = true;
  const { BackendUrl, getuserdata ,isloggedin , userdata} = useContext(AppContext);
  const navigate = useNavigate();

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').trim();
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map(input => input.value);
      const otp = otpArray.join('');
      const { data } = await axios.post(`${BackendUrl}/api/auth/verifyotp`, { otp });

      if (data.success) {
        toast.success(data.message);
        getuserdata();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

useEffect(() => {
  if (isloggedin && userdata?.isAccountverified) {
    navigate('/');
  }
}, [isloggedin, userdata, navigate]);

  return (
    <div className="parent min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="upper">
        <img
          src={assets.logo}
          alt="Logo"
          className="logoicon"
          onClick={() => navigate('/')}
        />
      </div>

      <div className="lower bg-slate-900 rounded-lg shadow-lg text-indigo-300 text-sm">
        <h2>Email Verify OTP</h2>
        <p>Enter the 6-digit code sent to your email</p>

        <form onSubmit={onSubmitHandler}>
          <div className="otpdiv" onPaste={handlePaste}>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={el => (inputRefs.current[index] = el)}
                onInput={e => handleInput(e, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md itemsdiv"
                required
              />
            ))}
          </div>
          <button className="rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium mt-4">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Emailverify;
