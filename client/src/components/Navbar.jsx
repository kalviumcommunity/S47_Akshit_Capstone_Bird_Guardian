import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut } from "lucide-react";
import logo from "../assets/birdLogo.png";
import { navItems } from "../constants";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Navbar = () => {
  const { isLoggedIn, LogoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleLogout = () => {
    LogoutUser(navigate);
    setMobileDrawerOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "py-1" : "py-3"
    }`}>
      <div className={`container mx-auto px-4 transition-all duration-500 ${
        scrolled ? "max-w-5xl" : "max-w-7xl"
      }`}>
        <div className={`backdrop-blur-xl border border-neutral-800/50 rounded-2xl md:rounded-full bg-neutral-900/60 px-6 py-2 shadow-2xl flex justify-between items-center transition-all duration-500 ${
          scrolled ? "shadow-orange-500/10 px-4" : ""
        }`}>
          {/* Logo */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center flex-shrink-0 cursor-pointer group"
          >
            <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                <img className="h-10 w-10 mr-2 relative transform transition-transform group-hover:scale-110" src={logo} alt="Logo" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent ml-1">
                Bird-Guardian
            </span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex ml-14 space-x-8">
            {navItems.map((item, index) => (
              <li key={index} className="relative">
                <NavLink 
                  to={item.to}
                  className={({ isActive }) => `
                    relative text-sm font-medium transition-all duration-300 hover:text-orange-400 px-2 py-1
                    ${isActive ? "text-orange-500" : "text-neutral-400"}
                  `}
                >
                  {item.label}
                  {location.pathname === item.to && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]"></span>
                  )}
                </NavLink>
              </li>
            ))}
            {isLoggedIn && (
              <li className="relative">
                <NavLink 
                  to="/my-posts"
                  className={({ isActive }) => `
                    relative text-sm font-medium transition-all duration-300 hover:text-orange-400 px-2 py-1
                    ${isActive ? "text-orange-500" : "text-neutral-400"}
                  `}
                >
                  My Posts
                  {location.pathname === "/my-posts" && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]"></span>
                  )}
                </NavLink>
              </li>
            )}
          </ul>

          {/* Actions */}
          <div className="hidden lg:flex justify-center space-x-5 items-center">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-neutral-800/80 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 text-neutral-300 py-2 px-5 rounded-full border border-neutral-700 transition-all duration-300 active:scale-95 text-sm font-medium group"
                >
                  <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink 
                    to="/signin" 
                    className="text-neutral-400 hover:text-white transition-all text-sm font-medium px-4 py-2 rounded-full hover:bg-neutral-800/50"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-2.5 px-7 rounded-full text-sm font-bold shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 hover:shadow-orange-500/40"
                >
                  Join Us
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button 
                onClick={toggleNavbar}
                className="p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-300 hover:text-white transition-all active:scale-90"
            >
              {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex justify-center items-start pt-24 px-4 overflow-hidden">
           {/* Overlay backdrop */}
           <div 
             className="absolute inset-0 bg-neutral-950/40 backdrop-blur-md transition-opacity duration-300"
             onClick={() => setMobileDrawerOpen(false)}
           ></div>
           
           <div 
             className="relative w-full max-w-sm bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl ring-1 ring-white/5 transform transition-all duration-300 animate-in zoom-in-95 slide-in-from-top-10"
           >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <img className="h-8 w-8 mr-2" src={logo} alt="Logo" />
                  <span className="font-bold text-lg">Bird-Guardian</span>
                </div>
                <button onClick={() => setMobileDrawerOpen(false)} className="text-neutral-500 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <ul className="space-y-3">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <NavLink 
                      to={item.to}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={({ isActive }) => `
                        flex items-center text-lg font-medium p-4 rounded-2xl transition-all duration-200
                        ${isActive ? "bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-[inset_0_0_10px_rgba(249,115,22,0.05)]" : "text-neutral-400 hover:bg-neutral-800 hover:text-white border border-transparent"}
                      `}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
                {isLoggedIn && (
                  <li>
                    <NavLink 
                      to="/my-posts"
                      onClick={() => setMobileDrawerOpen(false)}
                      className={({ isActive }) => `
                        flex items-center text-lg font-medium p-4 rounded-2xl transition-all duration-200
                        ${isActive ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" : "text-neutral-400 hover:bg-neutral-800 hover:text-white border border-transparent"}
                      `}
                    >
                      My Posts
                    </NavLink>
                  </li>
                )}
              </ul>

              <div className="mt-8 pt-6 border-t border-neutral-800/60 space-y-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 bg-red-500/5 hover:bg-red-500/10 text-red-500 p-4 rounded-2xl font-bold border border-red-500/10 active:scale-95 transition-all duration-200 text-lg shadow-sm"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink 
                      to="/signin" 
                      onClick={() => setMobileDrawerOpen(false)}
                      className="w-full flex items-center justify-center p-4 text-neutral-400 font-medium text-lg hover:text-white transition-colors"
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/signup"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white p-4 rounded-2xl text-lg font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-200"
                    >
                      Join Now
                    </NavLink>
                  </>
                )}
              </div>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
