import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { toast } from 'react-toastify';
import { Send, Image as ImageIcon, MapPin, Mail, Tag, Type, Palette } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const CreatePost = () => {
  const { isLoggedIn, token, user } = useAuth();
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
  const [isSubmitting, setIsSubmitting] = useState(false);



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
    setIsSubmitting(true);
    try {
      const postData = new FormData();
      postData.append('name', formData.name);
      postData.append('birdType', formData.birdType);
      postData.append('birdColor', formData.birdColor);
      postData.append('address', formData.address);
      postData.append('email', formData.email);
      postData.append('description', formData.description);
      if (formData.photo) {
        postData.append('photo', formData.photo);
      }

      await axios.post(`${import.meta.env.VITE_APP_URL}/posts/create`, postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Post created successfully!");
      navigate('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout 
        title="Report a Sighting" 
        subtitle="Share details about a bird you've encountered to help our community track and protect local wildlife."
    >
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Form Card */}
        <div className="bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-neutral-800 shadow-2xl shadow-black/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-300">Bird Name / Label</label>
                <div className="relative flex items-center rounded-xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition-all">
                  <Type className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent text-white px-3 py-3 rounded-xl placeholder-neutral-500 focus:outline-none"
                    placeholder="E.g., Blue Jay, Robin..."
                    required
                  />
                </div>
              </div>

              {/* Email Field - Read Only */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-300">Contact Email</label>
                <div className="relative flex items-center rounded-xl bg-neutral-800/30 border border-neutral-700 opacity-70 transition-all">
                  <Mail className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                  <input
                    type="email"
                    name="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full bg-transparent text-neutral-400 px-3 py-3 rounded-xl cursor-not-allowed focus:outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Bird Type Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-300">Bird Type / Species</label>
                <div className="relative flex items-center rounded-xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition-all">
                  <Tag className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                  <input
                    type="text"
                    name="birdType"
                    value={formData.birdType}
                    onChange={handleChange}
                    className="w-full bg-transparent text-white px-3 py-3 rounded-xl placeholder-neutral-500 focus:outline-none"
                    placeholder="E.g., Songbird, Raptor..."
                    required
                  />
                </div>
              </div>

              {/* Bird Color Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-300">Dominant Color</label>
                <div className="relative flex items-center rounded-xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition-all">
                  <Palette className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                  <input
                    type="text"
                    name="birdColor"
                    value={formData.birdColor}
                    onChange={handleChange}
                    className="w-full bg-transparent text-white px-3 py-3 rounded-xl placeholder-neutral-500 focus:outline-none"
                    placeholder="E.g., Bright Blue, Brown..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">Sighting Location</label>
              <div className="relative flex items-center rounded-xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition-all">
                <MapPin className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white px-3 py-3 rounded-xl placeholder-neutral-500 focus:outline-none"
                  placeholder="Address or nearest landmark"
                  required
                />
              </div>
            </div>

            {/* Photo Upload Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">Photo Evidence</label>
              <div className="relative flex items-center rounded-xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 transition-all p-1">
                <div className="bg-neutral-800 p-2 rounded-lg ml-1">
                  <ImageIcon className="w-5 h-5 text-neutral-400" />
                </div>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-transparent text-neutral-300 px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20 flex-1 focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">Observation Details</label>
              <div className="relative rounded-xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition-all">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white px-4 py-3 rounded-xl placeholder-neutral-500 focus:outline-none min-h-[120px] resize-y"
                  placeholder="Describe the bird's condition, behavior, or any other important details..."
                  required
                ></textarea>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Sighting
                  </>
                )}
              </button>
            </div>
            
            <div className="text-center">
               <button type="button" onClick={() => navigate('/posts')} className="text-neutral-500 hover:text-neutral-300 transition-colors text-xs font-bold uppercase tracking-widest">Cancel and go back</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
