import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useAuth} from '../store/Auth'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();

  const {storeTokenInLS}  = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = `${import.meta.env.VITE_APP_URL}/signin`;
      const response = await axios.post(`${url}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const resData = await response.data;
        console.log("res from server" , resData);
        // Store the token in local storage
        storeTokenInLS(resData.token);
        console.log("Form submitted successfully");
        setFormData({ email: "", password: "" });
        navigate("/AllPost");
      } else {
        console.log("Form submission failed");
        alert("Invalid credentials. Please try again.");
      }

      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-yellow-200 to-yellow-500 bg-opacity-50">
      <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-md p-8 shadow-lg w-full max-w-md border-4 animate-borderColorCycle">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 block w-full">Sign In</button>
          <button type="button" className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md mb-4 block w-full flex items-center justify-center">
            Continue with Google
          </button>
        </form>
        <p className="text-gray-700 text-center">
          Don't have an account? <Link to="/SignUp" className="text-blue-500">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
