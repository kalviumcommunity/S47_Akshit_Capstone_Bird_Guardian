import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { toast } from 'react-toastify';
import { Save, Image as ImageIcon, MapPin, Mail, Tag, Type, Palette, ArrowLeft } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const UpdatePost = () => {
  const { id } = useParams();
  const { token, isLoggedIn } = useAuth();
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
  const [existingPhoto, setExistingPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const url = `${import.meta.env.VITE_APP_URL}/posts/update/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      setFormData({
        name: data.name || '',
        birdType: data.birdType || '',
        birdColor: data.birdColor || '',
        address: data.address || '',
        email: data.email || '',
        description: data.description || '',
        photo: null
      });
      setExistingPhoto(data.photo);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error("Failed to fetch post details.");
      navigate('/my-posts');
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    for (let key in formData) {
      if (key === 'photo' && formData.photo === null) continue;
      data.append(key, formData[key]);
    }

    try {
      const url = `${import.meta.env.VITE_APP_URL}/posts/update/${id}`;
      await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Post updated successfully!");
      navigate('/my-posts');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error("Failed to update post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout title="Fetching Data...">
        <div className="min-h-[400px] flex flex-col justify-center items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Loading report details</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Update Sighting"
      subtitle="Modify the details of your bird sighting report. Keeping accurate records helps our community mission."
    >
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/my-posts')}
          className="group flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        {/* Form Card */}
        <div className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-800 shadow-2xl shadow-black/50 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-400 ml-1">Bird Name / Label</label>
                <div className="relative flex items-center rounded-2xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 transition-all">
                  <Type className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent text-white px-3 py-4 rounded-2xl placeholder-neutral-500 focus:outline-none font-medium"
                    required
                  />
                </div>
              </div>

              {/* Email Field - Read Only */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-400 ml-1">Reporter Contact</label>
                <div className="relative flex items-center rounded-2xl bg-neutral-800/20 border border-neutral-800 opacity-60 transition-all">
                  <Mail className="w-5 h-5 text-neutral-600 ml-4 flex-shrink-0" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="w-full bg-transparent text-neutral-500 px-3 py-4 rounded-2xl cursor-not-allowed focus:outline-none"
                  />
                </div>
              </div>

              {/* Bird Type Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-400 ml-1">Species / Classification</label>
                <div className="relative flex items-center rounded-2xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 transition-all">
                  <Tag className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                  <input
                    type="text"
                    name="birdType"
                    value={formData.birdType}
                    onChange={handleChange}
                    className="w-full bg-transparent text-white px-3 py-4 rounded-2xl placeholder-neutral-500 focus:outline-none font-medium"
                    required
                  />
                </div>
              </div>

              {/* Bird Color Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-400 ml-1">Primary Coloration</label>
                <div className="relative flex items-center rounded-2xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 transition-all">
                  <Palette className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                  <input
                    type="text"
                    name="birdColor"
                    value={formData.birdColor}
                    onChange={handleChange}
                    className="w-full bg-transparent text-white px-3 py-4 rounded-2xl placeholder-neutral-500 focus:outline-none font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-400 ml-1">Location of Sighting</label>
              <div className="relative flex items-center rounded-2xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 transition-all">
                <MapPin className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white px-3 py-4 rounded-2xl placeholder-neutral-500 focus:outline-none font-medium"
                  required
                />
              </div>
            </div>

            {/* Photo Upload Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-sm font-medium text-neutral-400">Update Illustration</label>
                {existingPhoto && !formData.photo && (
                  <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20 uppercase tracking-tighter">
                    Keep Current Photo
                  </span>
                )}
              </div>
              <div className="relative flex items-center rounded-2xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 transition-all p-1">
                <div className="bg-neutral-800 p-2.5 rounded-xl ml-1">
                  <ImageIcon className="w-5 h-5 text-neutral-400" />
                </div>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-transparent text-neutral-400 px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20 flex-1 focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-400 ml-1">Observation Context</label>
              <div className="relative rounded-2xl bg-neutral-800/50 border border-neutral-700 focus-within:border-orange-500 transition-all">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white px-5 py-4 rounded-2xl placeholder-neutral-500 focus:outline-none min-h-[140px] resize-y leading-relaxed"
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-4 px-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full" />
                    Synchronizing...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Sighting Record
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePost;
