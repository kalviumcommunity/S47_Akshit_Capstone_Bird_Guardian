import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/Auth';  
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [userDataInitialized, setUserDataInitialized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user && !userDataInitialized) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        message: ''
      });
      setUserDataInitialized(true);
    }
  }, [user, userDataInitialized]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${import.meta.env.VITE_APP_URL}/contact`;
      const response = await axios.post(`${url}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response);

      if (response.status === 201) {
        setFormData({
          name: user.name || '',
          email: user.email || '',
          message: ''
        });
        const resData = await response.data;
        console.log('res from server', resData);
      } else {
        console.log('Form submission failed');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
    }

    console.log('Form submitted', formData);
  };

  return (
    <div className="mt-20 container mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide">
        Contact Us
      </h2>
      <p className="mt-4 text-center text-lg text-neutral-500 max-w-2xl mx-auto">
        Have any questions or feedback? We'd love to hear from you!
      </p>
      <form onSubmit={handleSubmit} className="mt-10 max-w-2xl mx-auto p-6 border border-neutral-700 rounded-lg bg-neutral-900">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-neutral-300">
            Name
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="mt-2 block w-full px-4 py-2 border border-neutral-700 rounded-md bg-neutral-800 text-neutral-300 focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="mt-2 block w-full px-4 py-2 border border-neutral-700 rounded-md bg-neutral-800 text-neutral-300 focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-neutral-300">
            Message
          </label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
            className="mt-2 block w-full px-4 py-2 border border-neutral-700 rounded-md bg-neutral-800 text-neutral-300 focus:border-orange-500 focus:outline-none"
            rows="6"
          />
        </div>
        <div className="text-center">
          <button 
            type="submit" 
            className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-6 rounded-md text-white hover:from-orange-600 hover:to-orange-900"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
