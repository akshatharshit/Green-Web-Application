import React from 'react';
import { Github, Facebook, Twitter, Instagram } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    return (
        <footer className=" text-white py-12 mt-16 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700">
            <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row justify-between space-y-12 md:space-y-0">
                {/* Left section */}
                <div className="mb-8 md:mb-0 md:w-1/3">
                    <h3 className="text-3xl font-bold mb-2 text-white">Green</h3>
                    <p className="text-gray-200">
                        We are dedicated to promoting sustainability and protecting the environment.
                    </p>
                </div>

                {/* Center section */}
                <div className="mb-8 md:mb-0 md:w-1/3">
                    <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                    <ul className="space-y-2">
                        <li>
                            <a onClick={()=>{navigate('/about')}} className="hover:text-green-300">About Us</a>
                        </li>
                        <li>
                            <a href="#services" className="hover:text-green-300">Services</a>
                        </li>
                        <li>
                            <a onClick={()=>{navigate('/contact')}} className="hover:text-green-300">Contact</a>
                        </li>
                        <li>
                            <a href="#privacy" className="hover:text-green-300">Privacy Policy</a>
                        </li>
                    </ul>
                </div>

                {/* Right section - Social Links */}
                <div className="md:w-1/3">
                    <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
                    <div className="flex space-x-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <Facebook className="text-white hover:text-green-300 h-8 w-8 transition duration-200 ease-in-out transform hover:scale-110" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <Twitter className="text-white hover:text-green-300 h-8 w-8 transition duration-200 ease-in-out transform hover:scale-110" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram className="text-white hover:text-green-300 h-8 w-8 transition duration-200 ease-in-out transform hover:scale-110" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <Github className="text-white hover:text-green-300 h-8 w-8 transition duration-200 ease-in-out transform hover:scale-110" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom section - Copyright */}
            <div className="border-t border-gray-600 pt-4 text-center text-sm mt-6">
                <p>© 2025 Green. All rights reserved.</p>
            </div>
        </footer>
    );
}

const footerStyle = {
  textAlign: 'center',
  padding: '1rem',
  zIndex: 1,
};
export default Footer;
