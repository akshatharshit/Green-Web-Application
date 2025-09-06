import React from "react";
import { Github, Facebook, Twitter, Instagram, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="relative text-white bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800">
      {/* Content Section */}
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="text-green-400" size={28} />
            <h3 className="text-3xl font-extrabold">MatiBandhu</h3>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm">
            We are dedicated to promoting <span className="text-green-400 font-semibold">sustainability</span> 
            and protecting the <span className="text-green-400 font-semibold">environment</span>.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-green-300">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => navigate("/about")}
                className="hover:text-green-400 transition"
              >
                About Us
              </button>
            </li>
            <li>
              <a href="#services" className="hover:text-green-400 transition">
                Services
              </a>
            </li>
            <li>
              <button
                onClick={() => navigate("/contact")}
                className="hover:text-green-400 transition"
              >
                Contact
              </button>
            </li>
            <li>
              <a href="#privacy" className="hover:text-green-400 transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-green-300">
            Follow Us
          </h4>
          <div className="flex space-x-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition transform hover:scale-110"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition transform hover:scale-110"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition transform hover:scale-110"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition transform hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} <span className="text-green-400">MatiBandhu</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
