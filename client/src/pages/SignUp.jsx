import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/Auth';
import { toast } from 'react-toastify';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = `${import.meta.env.VITE_APP_URL}/auth/signup`;
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = await response.data;

      if (response.status === 201 || response.status === 200) {
        storeTokenInLS(resData.token);
        setFormData({ name: "", email: "", password: "" });
        toast.success("User created successfully");
        navigate("/posts");
      } else {
        console.error(resData);
        toast.error(resData.extraDetails ? resData.extraDetails : resData.message);
      }
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error(error.response?.data?.extraDetails ? error.response.data.extraDetails : error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden bg-neutral-950 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/25 shrink-0">
               <span className="text-xl">🐦</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Join Bird Guardian</h1>
          </div>
          <p className="text-neutral-400">Create your account and start exploring</p>
        </div>

        {/* Card */}
        <div className="bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-neutral-800 shadow-2xl shadow-black/50 p-8 relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300">
                Full Name
              </label>
              <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${
                focusedField === 'name' 
                  ? 'border-orange-500 shadow-[0_0_0_3px_rgba(249,115,22,0.1)]' 
                  : 'border-neutral-700 hover:border-neutral-600'
              } bg-neutral-800/50`}>
                <User className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full bg-transparent text-white px-3 py-3.5 rounded-xl placeholder-neutral-500 focus:outline-none"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                Email Address
              </label>
              <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${
                focusedField === 'email' 
                  ? 'border-orange-500 shadow-[0_0_0_3px_rgba(249,115,22,0.1)]' 
                  : 'border-neutral-700 hover:border-neutral-600'
              } bg-neutral-800/50`}>
                <Mail className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full bg-transparent text-white px-3 py-3.5 rounded-xl placeholder-neutral-500 focus:outline-none"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300">
                Password
              </label>
              <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${
                focusedField === 'password' 
                  ? 'border-orange-500 shadow-[0_0_0_3px_rgba(249,115,22,0.1)]' 
                  : 'border-neutral-700 hover:border-neutral-600'
              } bg-neutral-800/50`}>
                <Lock className="w-5 h-5 text-neutral-500 ml-4 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="w-full bg-transparent text-white px-3 py-3.5 rounded-xl placeholder-neutral-500 focus:outline-none"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-4 text-neutral-500 hover:text-neutral-300 transition-colors flex-shrink-0"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-neutral-700" />
            <span className="px-4 text-sm text-neutral-500">or</span>
            <div className="flex-1 border-t border-neutral-700" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-neutral-800 hover:bg-neutral-700/80 text-neutral-300 py-3.5 px-4 rounded-xl font-medium transition-all duration-300 border border-neutral-700 hover:border-neutral-600"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-neutral-400">
          Already have an account?{" "}
          <Link to="/signin" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
