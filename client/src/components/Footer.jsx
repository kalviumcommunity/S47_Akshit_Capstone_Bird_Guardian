import { platformLinks, SocialMediaLink } from "../constants";
import { Link } from "react-router-dom";
import logo from "../assets/birdLogo.png";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-neutral-800/50 bg-neutral-950 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-12">
          
          {/* Brand section */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <img className="h-8 w-8" src={logo} alt="Logo" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-600 bg-clip-text text-transparent">
                Bird-Guardian
              </span>
            </div>
            <p className="text-neutral-400 max-w-sm leading-relaxed">
              Empowering communities to protect, track, and care for bird populations. Together, we can make every flight safe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Quick Links</h3>
            <ul className="space-y-4">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-neutral-500 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-orange-500 transition-colors" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Social Presence</h3>
            <ul className="space-y-4">
              {SocialMediaLink.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-neutral-500 hover:text-white transition-colors duration-300 text-sm"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform text-neutral-400 group-hover:text-orange-400">
                      {link.icon}
                    </span>
                    <span>{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs">
            © {new Date().getFullYear()} Bird Guardian. Developed with ❤️ for avian welfare.
          </p>
          <div className="flex gap-6 text-xs text-neutral-600">
            <div className="group relative">
                <span className="hover:text-neutral-400 transition-colors cursor-pointer">Privacy Policy</span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-900 border border-neutral-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                   trust me bro!
                </div>
            </div>
            <div className="group relative">
                <span className="hover:text-neutral-400 transition-colors cursor-pointer">Terms of Service</span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-900 border border-neutral-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                   trust me bro!
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
