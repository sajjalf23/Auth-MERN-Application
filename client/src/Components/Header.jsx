import React, { useContext ,useEffect} from "react";
import { assets } from "../assets/assets";
import "../Styles/header.css";
import { AppContext } from "../Context/appcontext";


function Header() {
  const { userdata  } = useContext(AppContext);
  useEffect(() => {
  if (userdata) {
    console.log("User data updated:", userdata);
  }
  }, [userdata]);
      return (
        <div className="header">
          <img src={assets.header_img} alt="" className="headerimg" />
          <h1 className="name text-xl sm:text-3xl font-medium">
            Hey {userdata ? userdata.name : "Developer"}
            <img src={assets.hand_wave} alt="" className="handwave" />
          </h1>
          <h2 className="welcome text-3xl sm:text-5xl font-semibold">
            Welcome to our App
          </h2>
          <p className="para">
            Let’s start with a quick product tour and we will have you up and running in no time!
          </p>
          <button className="started">Get Started</button>
        </div>
      );
    }

export default Header;
