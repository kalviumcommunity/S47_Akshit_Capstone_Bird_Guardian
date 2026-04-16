import React from 'react';
import { FaInstagramSquare, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";
import { Heart, Globe, Users, Code } from "lucide-react";
import teamPhoto from '../assets/teamPhoto.jpg';
import { useAuth } from '../context/Auth';

const AboutUs = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 relative overflow-hidden pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {user && (
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-6 font-medium tracking-wide">
              Welcome back, {user.name} 👋
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-amber-600 text-transparent bg-clip-text tracking-tight mb-6">
            Our Story & Mission
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
            At Bird Guardian, we are passionate about understanding and enhancing the lives of our feathered friends. Our mission is to provide comprehensive resources on bird behavior, habitats, and conservation efforts while empowering individuals to take tangible action to protect bird populations worldwide.
          </p>
        </div>

        {/* Vision & Community Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32">
          {/* Image */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
               <img 
                  src={teamPhoto} 
                  alt="Bird Guardian Team" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              <p className="text-neutral-400 leading-relaxed">
                We believe in the power of knowledge, compassion, and action to create a brighter future for birds. Our platform offers valuable insights and information to deepen your appreciation for these fascinating creatures, while also providing ways to contribute to their well-being through donations, reporting sightings, and supporting conservation initiatives.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Join Our Community</h2>
              <p className="text-neutral-400 leading-relaxed">
                By exploring our website, you become part of a community of like-minded individuals dedicated to making a meaningful difference in the lives of birds. Together, we can build a world where birds thrive, and their beauty and diversity inspire generations to come.
              </p>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-800 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background decoration for the card */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Code className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-sm mb-6">
                <Heart className="w-4 h-4 text-orange-500" />
                The Developer
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Akshit Prajapat</span>
              </h2>
              
              <p className="text-neutral-400 leading-relaxed text-lg mb-8 max-w-3xl">
                The developer behind Bird Guardian. I'm currently pursuing a B.Tech from JECRC University in collaboration with Kalvium. I am passionate about contributing to social causes and inspiring people to make a positive impact in whatever way they can. I believe in the power of technology to drive meaningful change and am dedicated to using my skills to create platforms that benefit society and the environment.
              </p>

              <div className="flex items-center gap-4">
                <a 
                  href="https://linkedin.com/in/your-profile" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-neutral-800 hover:bg-[#0A66C2] border border-neutral-700 hover:border-[#0A66C2] flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://instagram.com/your-profile" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-neutral-800 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] border border-neutral-700 hover:border-transparent flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <FaInstagramSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://wa.me/your-number" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-neutral-800 hover:bg-[#25D366] border border-neutral-700 hover:border-[#25D366] flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 group"
                  aria-label="WhatsApp"
                >
                  <FaWhatsappSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
