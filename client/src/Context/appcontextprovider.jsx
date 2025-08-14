import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "./appcontext";

export const AppContextProvider = ({ children }) => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isloggedin, setisloggedin] = useState(false);
  const [userdata, setuserdata] = useState(null);
  axios.defaults.withCredentials = true;
   axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  const getuserdata = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${BackendUrl}/api/user/data`);
      data.success ? setuserdata(data.data) : toast.error(data.message);
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
