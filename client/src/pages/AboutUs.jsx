import React from 'react';
import { FaInstagramSquare, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";
import teamPhoto from '../assets/teamPhoto.jpg';
import { useAuth } from '../store/Auth';  

const AboutUs = () => {
  const { user } = useAuth();

  return (
    <div className="mt-20">
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-blue-500 to-red-800 text-transparent bg-clip-text text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          {user ? `Hey, ${user.name}!` : 'Hello!'}
        </h1>
        <h1 className="bg-gradient-to-r from-pink-500 to-red-800 text-transparent bg-clip-text text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          About Bird Guardian
        </h1>
        <p className=" mt-10 text-lg text-center text-neutral-500 max-w-4xl mx-auto">
          At Bird Guardian, we are passionate about understanding and enhancing the lives of our feathered friends. Our mission is to provide comprehensive resources on bird behavior, habitats, and conservation efforts while empowering individuals to take tangible action to protect bird populations worldwide.
        </p>
      </div>

      <div className="mt-20 flex flex-wrap justify-center items-center">
        <div className="w-full lg:w-1/2 p-6">
          <img src={teamPhoto} alt="Bird Guardian Team" className="rounded-lg shadow-lg border-4 animate-borderColorCycle" style={{ maxWidth: 'calc(100% - 2rem)' }} />
        </div>
        <div className="w-full lg:w-1/2 p-6">
          <h2 className="bg-gradient-to-r from-pink-500 to-red-800 text-transparent bg-clip-text text-2xl font-semibold mt-6 lg:mt-0 text-gradient">Our Mission</h2>
          <p className="text-md mt-4 text-neutral-500">
            We believe in the power of knowledge, compassion, and action to create a brighter future for birds. Our platform offers valuable insights and information to deepen your appreciation for these fascinating creatures, while also providing ways to contribute to their well-being through donations, reporting sightings, and supporting conservation initiatives.
          </p>
          <h2 className="bg-gradient-to-r from-pink-500 to-red-800 text-transparent bg-clip-text text-2xl font-semibold mt-10 text-gradient">Join Our Community</h2>
          <p className="text-md mt-4 text-neutral-500">
            By exploring our website, you become part of a community of like-minded individuals dedicated to making a meaningful difference in the lives of birds. Together, we can build a world where birds thrive, and their beauty and diversity inspire generations to come.
          </p>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="bg-gradient-to-r from-pink-500 to-red-800 text-transparent bg-clip-text text-3xl font-semibold mb-8 text-gradient">About the Developer</h2>
        <p className="text-lg text-neutral-500 max-w-4xl mx-auto">
          Hello, I'm <span className="font-semibold">Akshit Prajapat</span>, the developer behind Bird Guardian. I'm currently pursuing a B.Tech from JECRC University in collaboration with Kalvium. I am passionate about contributing to social causes and inspiring people to make a positive impact in whatever way they can. I believe in the power of technology to drive meaningful change and am dedicated to using my skills to create platforms that benefit society and the environment.
        </p>
        <div className="flex justify-center space-x-6 mt-6">
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-red-800 text-neutral-300 hover:text-white text-3xl">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-red-800 text-neutral-300 hover:text-white text-3xl">
            <FaInstagramSquare />
          </a>
          <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-red-800 text-neutral-300 hover:text-white text-3xl">
            <FaWhatsappSquare />
          </a>
        </div>
      </div>

      <div className="mt-8"></div> {/* Adding margin at the bottom */}
    </div>
  );
};

export default AboutUs;
