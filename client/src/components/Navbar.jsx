import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import logo from "../assets/birdLogo.png";
import { navItems } from "../constants";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";

const Navbar = () => {
  const { isLoggedIn, LogoutUser } = useAuth();
  const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleLogout = () => {
    LogoutUser(navigate);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">Bird-Guardian</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/SignIn" className="py-2 px-3 border rounded-md">
                  Sign In
                </NavLink>
                <NavLink
                  to="/SignUp"
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Create an account
                </NavLink>
              </>
            )}
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <NavLink to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
            <div className="justify-center space-x-12 items-center">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink to="/SignIn" className="py-2 px-3 border rounded-md">
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/SignUp"
                    className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                  >
                    Create an account
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
