


import React from "react";
import Navbar from "../Components/navbar";
import Header from "../Components/Header";

const Home = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("/bg_img.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
