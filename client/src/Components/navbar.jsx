import React, { useContext } from "react";
import { assets } from "../assets/assets";
import "../Styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/appcontext";
import { toast } from 'react-toastify';
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const {userdata , BackendUrl,setisloggedin , setuserdata } = useContext(AppContext);
  const sendverifyotp = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(BackendUrl + '/api/auth/sendverifyotp');
        if (data.success) {
          toast.success(data.message);
          navigate('/email-verify');
          }else {
            toast.error(data.message);
        }
      }
      catch(error){
        toast.error(error.message);
      }
    }
  const logout = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(BackendUrl + '/api/auth/logout');
        if (data.success) {
          setisloggedin(false);
          toast.success(data.message);
          setuserdata(null);
          navigate('/');
          }else {
            toast.error(data.message);
        }
      }
      catch(error){
        toast.error(error.message);
      }
    }
  return (
    <div className="navbar">
      <img src={assets.logo} alt="Logo" className="logo" />

      {userdata ? (
        <div className="navright dropdown">
          <button
            className="btn btn-secondary dropdown-toggle namedlogo"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {userdata.name[0].toUpperCase()}
          </button>

          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton"
          >
            {
              userdata.isAccountverified === true ? 
              <></> : <li onClick={sendverifyotp}>
              <a className="dropdown-item" href="#">
                Verify Email
              </a>
            </li>
            }
            <li onClick={logout}>
              <a className="dropdown-item" href="#">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <button className="login" onClick={() => navigate("/login")}>
          Login
          <img src={assets.arrow_icon} alt="" className="arrowsign" />
        </button>
      )}
    </div>
  );
};

export default Navbar;



