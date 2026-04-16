import React from 'react';
import { Link } from 'react-router-dom';
import { Construction, Hammer, Home, ArrowLeft } from 'lucide-react';

const UnderConstruction = () => {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Icon with animated ring */}
        <div className="relative inline-flex items-center justify-center mb-10">
          <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl animate-ping" />
          <div className="relative bg-neutral-900 border border-orange-500/30 w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl">
            <Construction className="w-12 h-12 text-orange-500" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Pardon Our <span className="bg-gradient-to-r from-orange-400 to-amber-600 text-transparent bg-clip-text">Dust!</span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed">
          The Bird Guardian <span className="text-white font-semibold italic">OurStore</span> is currently being renovated to bring you the best eco-friendly avian products. We'll be back shortly!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 hover:border-neutral-700 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Footer status */}
        <div className="mt-16 flex items-center justify-center gap-2 text-neutral-600 text-sm font-medium">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          SITE STATUS: ACTIVE MAINTENANCE
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
