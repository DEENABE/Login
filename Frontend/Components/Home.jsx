import React, { use } from "react";
import { Box, Container, Typography, Button, Grid, Paper} from "@mui/material";
import gym1 from "../images/gym1.jpg";
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
        <img src={fitlogo} alt="Fitness Logo" className="w-15 h-20 absolute top-4 -ml-2 rounded-2xl pb-10 " onClick={handlereload} />
      </div>
      <div className="bg-gray-800 text-red-500 flex justify-between md:text-4xl p-4 text-5xl font-bold ">
        <div className="pl-10">MyFitness</div>
    
        
      </div>
      <div>
       <img src={login} alt="Login" className="w-15 h-15 absolute top-4 right-4 rounded-full mr-20 hover:scale-3d transition duration-300"onClick={handlechangeicon}/>
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
