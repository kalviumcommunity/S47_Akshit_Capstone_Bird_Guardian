import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Auth';  
import axios from 'axios';
import { toast } from 'react-toastify';
import { Send, User, Mail, MessageSquare, MapPin, Phone } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userDataInitialized, setUserDataInitialized] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const [focusedField, setFocusedField] = useState(null);

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
    setIsSubmitting(true);

    try {
      const url = `${import.meta.env.VITE_APP_URL}/contact`;
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          message: ''
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden pt-32 pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-400 to-amber-600 text-transparent bg-clip-text tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Have questions about bird conservation, need help with a sighting, or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-8 bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-neutral-400 mb-8">
                Fill up the form and our team will get back to you within 24 hours.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-neutral-300">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <p className="text-neutral-400">+91 (123) 456-7890</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-neutral-300">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p className="text-neutral-400">hello@birdguardian.org</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-neutral-300">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                  <MapPin className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Location</p>
                  <p className="text-neutral-400">JECRC University, Jaipur, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form or Sign In Prompt */}
          <div className="lg:col-span-3">
            {isLoggedIn ? (
              <div className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-800 shadow-2xl shadow-black/50 p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field - Read Only */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-300">
                        Your Name
                      </label>
                      <div className={`relative flex items-center rounded-xl transition-all duration-300 bg-neutral-800/30 border border-neutral-700 opacity-70`}>
                        <User className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          readOnly
                          className="w-full bg-transparent text-neutral-400 px-3 py-3.5 rounded-xl cursor-not-allowed focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Email Field - Read Only */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                        Email Address
                      </label>
                      <div className={`relative flex items-center rounded-xl transition-all duration-300 bg-neutral-800/30 border border-neutral-700 opacity-70`}>
                        <Mail className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          readOnly
                          className="w-full bg-transparent text-neutral-400 px-3 py-3.5 rounded-xl cursor-not-allowed focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-300">
                      Your Message
                    </label>
                    <div className={`relative flex rounded-xl transition-all duration-300 bg-neutral-800/50 border ${
                      focusedField === 'message' ? 'border-orange-500 shadow-[0_0_0_3px_rgba(249,115,22,0.1)]' : 'border-neutral-700 hover:border-neutral-600'
                    }`}>
                      <MessageSquare className="w-5 h-5 text-neutral-500 ml-4 mt-4 flex-shrink-0" />
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required 
                        placeholder="How can we help you?"
                        className="w-full bg-transparent text-white px-3 py-3.5 rounded-xl placeholder-neutral-500 focus:outline-none min-h-[160px] resize-y"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto relative group bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3.5 px-8 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 ml-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-800 shadow-2xl p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-6">
                  <Mail className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Start a Conversation</h3>
                <p className="text-neutral-400 mb-8 max-w-sm">
                  Please sign in to your Bird Guardian account to send us a message. Your communication matters to us.
                </p>
                <Link 
                  to="/signin" 
                  className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3.5 px-10 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
                >
                  Sign In Now
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
