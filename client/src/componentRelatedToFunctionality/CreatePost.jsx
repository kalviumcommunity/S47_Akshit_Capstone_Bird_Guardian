import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../store/Auth'; 
import { toast } from 'react-toastify';

const CreatePost = () => {
  const { isLoggedIn, token } = useAuth(); // Use isLoggedIn and token from useAuth hook
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    birdType: '',
    birdColor: '',
    photo: null,
    address: '',
    email: '',
    description: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You need to sign in or sign up to access this page. To Create Post");
      navigate('/SignIn');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = e => {
    setFormData({
      ...formData,
      photo: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
      };

      const postData = {
        name: formData.name,
        birdType: formData.birdType,
        birdColor: formData.birdColor,
        address: formData.address,
        email: formData.email,
        description: formData.description,
      };

      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/uploadPost`, postData, config);
      
      console.log('Post created successfully:', response.data);
      navigate('/AllPost'); // Navigate to success page or other appropriate page
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.'); 
    }
  };
  
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Create Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bird Type</label>
            <input
              type="text"
              name="birdType"
              value={formData.birdType}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bird Color</label>
            <input
              type="text"
              name="birdColor"
              value={formData.birdColor}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border rounded-md"
              
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            ></textarea>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-800 text-white py-2 px-4 rounded-md">Submit</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
