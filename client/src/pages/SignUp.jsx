
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useAuth} from '../store/Auth'

import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });


  const navigate = useNavigate();


  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
  
    try {
      const url = `${import.meta.env.VITE_APP_URL}/postusers`;
      const response = await axios.post(`${url}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response);

      const resData = await response.data;
      console.log("res from server", resData.message);

      if (response.status === 201 || response.status === 200) {

        // Store the token in local storage
        storeTokenInLS(resData.token);
        console.log("Form submitted successfully");
        setFormData({ name: "", email: "", password: "" });
        toast.success("User created successfully");
        navigate("/AllPost");
      } 

      console.log("Form submitted:", resData);

      
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.extraDetails ? error.response.data.extraDetails : error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-yellow-200 to-yellow-500 bg-opacity-50">
      <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-md p-8 shadow-lg w-full max-w-md border-4 animate-borderColorCycle">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-800">Name</label>
            <input 
              type="text"
              name = "name" 
              id="name" 
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
              placeholder="Enter your name" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-800">Email</label>
            <input 
              type="email"
              name = "email" 
              id="email" 
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-800">Password</label>
            <input 
              type="password" 
              name = "password"
              id="password" 
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 block w-full">Sign Up</button>
          <button type="button" className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md mb-4 block w-full flex items-center justify-center">
            Continue with Google
          </button>
        </form>
        <p className="text-gray-700 text-center">
          Already have an account? <Link to="/SignIn" className="text-blue-500">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
