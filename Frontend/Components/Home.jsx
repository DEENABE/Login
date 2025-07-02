import React, { use } from "react";
import { Box, Container, Typography, Button, Grid, Paper} from "@mui/material";
import gym1 from "../images/gym1.jpg";
import contact from "../images/contact.jpg";
import { Link,useNavigate } from "react-router-dom";
import fitlogo from "../images/logo.jpg";
import login from "../images/login.jpg";




const Home = () => {
   const navigate=useNavigate();

  const handlechangeicon = () => {
    navigate("/signup");
  }
  const handlereload = () => {
    navigate("/");
  }
 
  return (
 <div className="relative w-full h-full">
      {/* 🔴 Top Bar */}
      <div>
        <img src={fitlogo} alt="Fitness Logo" className="w-15 h-20 absolute top-4 -ml-2 rounded-2xl pb-10" onClick={handlereload} />
      </div>
      <div className="bg-gray-800 text-red-500 flex justify-between md:text-4xl p-4 text-5xl font-bold ">
        <div className="pl-10">MyFitness</div>
    
        <div className="flex items-center gap-2  ">
          {/* <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M391.1 351.1c-38.7 0-75.3-8.9-108.7-24.9-12.1-5.9-26.2-1.2-33.5 10.5l-22.7 36.3c-52.6-27.6-94.5-69.5-122.1-122.1l36.3-22.7c11.7-7.3 16.4-21.4 10.5-33.5-16-33.4-24.9-70-24.9-108.7C126 10.7 115.3 0 102 0H57.1C42.4 0 30 12.4 30 27.1 30 306.5 205.5 482 484.9 482c14.7 0 27.1-12.4 27.1-27.1V410c0-13.3-10.7-24-24-24-38.7 0-75.3-8.9-108.7-24.9z" />
          </svg> */}
          <span className="text-2xl"><Link to ="/contacts"><img src={contact} className="w-10 h-10 top-3  rounded-full hover:transition scale-3d duration-300 "/></Link></span>
        </div>
      </div>
      <div>
       <img src={login} alt="Login" className="w-10 h-10 absolute top-4 right-4 rounded-full mr-20 hover:scale-3d transition duration-300"onClick={handlechangeicon}/>
      </div>

      {/* 🏋️ Hero Section */}
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <img
          src={gym1}
          alt="Gym"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0  bg-opacity-60 flex items-center">
          <div className="text-white pl-12 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              TRANSFORM YOUR BODY AND MIND FOR LASTING SUCCESS
            </h1>
            <p className="mb-6 text-lg">
              Discover a Customized Approach to Achieve Your Fitness Goals
            </p>
            <button className="bg-red-500 px-6 py-3 font-semibold rounded-md hover:bg-red-600">
              Track Your Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
