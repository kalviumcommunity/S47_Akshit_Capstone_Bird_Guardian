import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/birdLogo.png";
import { navItems } from "../constants";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/Auth";


const Navbar = () => {

   const {isLoggedIn} = useAuth();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">Bird-Gurdian</span>
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
              <>
                  <div className="hidden lg:flex justify-center space-x-12 items-center">
                <NavLink
                  to="/Logout"
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Logout
                </NavLink>
              </div>
              </>
            ) : (
              <>
                <a href="/SignIn" className="py-2 px-3 border rounded-md">
                  Sign In
                </a>
                <a
                  href="/SignUp"
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Create an account
                </a>
              </>
            ) }
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
            <div className="hidden lg:flex justify-center space-x-12 items-center">
            {isLoggedIn ? (
              <>
                  <div className="hidden lg:flex justify-center space-x-12 items-center">
                <NavLink
                  to="/Logout"
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Logout
                </NavLink>
              </div>
              </>
            ) : (
              <>
                <a href="/SignIn" className="py-2 px-3 border rounded-md">
                  Sign In
                </a>
                <a
                  href="/SignUp"
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Create an account
                </a>
              </>
            ) }
          </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
