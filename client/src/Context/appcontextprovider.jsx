import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "./appcontext";

export const AppContextProvider = ({ children }) => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isloggedin, setisloggedin] = useState(false);
  const [userdata, setuserdata] = useState(null);
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = BackendUrl;
  const getuserdata = async () => {
    try {
      const { data } = await axios.get(`${BackendUrl}/api/user/data`, { withCredentials: true });
      console.log("✅ Full API response:", data);
      if (data.success) {
        setuserdata(data.data);
        setisloggedin(true);
      } else {
        toast.error(data.message);
        setisloggedin(false);
      }
      console.log("Response data:", data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = useMemo(() => ({
    BackendUrl,
    isloggedin,
    setisloggedin,
    userdata,
    setuserdata,
    getuserdata,
  }), [BackendUrl, isloggedin, userdata]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
