
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useAuth} from '../store/Auth'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);


  const navigate = useNavigate();


  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Client-side validation
    if (!validateEmail(formData.email)) {
      setError("Invalid email format");
      return;
    }
  
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
  
    try {
      const url = `${import.meta.env.VITE_APP_URL}/postusers`;
      const response = await axios.post(`${url}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const resData = await response.json();
        console.log("res from server" , resData);
        // Store the token in local storage
        storeTokenInLS(resData.token);
        console.log("Form submitted successfully");
        setFormData({ name: "", email: "", password: "" });
        navigate("/AllPost");
      }
  
      // Placeholder for form submission logic
      console.log("Form submitted:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error response
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <p className="text-gray-700 text-center">
          Already have an account? <Link to="/SignIn" className="text-blue-500">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
