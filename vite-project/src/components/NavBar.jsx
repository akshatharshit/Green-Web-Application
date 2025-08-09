import React, { useState } from "react";

import {
  BookCopy,
  Bot,
  ImageUp,
  MapPinned,
  LogOutIcon,
  LogInIcon,
  ScanLine,
  FileText,
  MoreVertical,
  Menu,
  Logs,
  PencilLine,
  ShoppingCart,
  Tag,
  SquareLibrary
} from "lucide-react"; // Import the 'Menu' icon for sidebar
import { FaRegistered } from "react-icons/fa";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  };

  return (
    <nav style={navStyle} className="flex items-center justify-between px-4 py-4  text-green-500 shadow-lg relative bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
      {/* Left - Sidebar Toggle and Logo */}
      <div className="flex items-center space-x-4 ">
        {/* Sidebar Toggle Icon */}
        <button
          onClick={toggleSidebar}
          className="text-green-700 focus:outline-none"
        >
          <Menu className="h-6 w-6" /> {/* Menu icon to toggle sidebar */}
        </button>

        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/041/322/814/small/ai-generated-group-of-small-green-plants-growing-in-dirt-free-photo.jpeg"
            alt="Logo"
            className="h-14 w-14 rounded-full p-2"
          />
          <span className="text-3xl font-bold tracking-wider italic">
            Green
          </span>
        </a>


      </div>



      {/* Right - Nav */}
      <div className="hidden md:flex items-center space-x-6">


        {token && (
          <>


            <Button
              className="hover:text-green-700 flex items-center space-x-2"
              onClick={() => window.location.href = "https://identify.plantnet.org/"}
            >
              <MapPinned className="h-5 w-5" />
              <span>Track</span>
            </Button>

            <Button
              className="hover:text-green-700 flex items-center space-x-2"
              onClick={() => window.location.href = "https://www.plant.id/"}
            >
              <ImageUp className="h-5 w-5" />
              <span>Upload</span>
            </Button>
          </>


        )}
        

        <Button
          className="hover:text-green-700 flex items-center space-x-2"
          onClick={() => navigate("/weather")}
        >
          <BookCopy className="h-5 w-5" />
          <span>Weather</span>
        </Button>


        <Button
          className="hover:text-green-700 flex items-center space-x-2"
          onClick={() => navigate("/about")}
        >
          <BookCopy className="h-5 w-5" />
          <span>About</span>
        </Button>

        <Button
          className="hover:text-green-700 flex items-center space-x-2"
          onClick={() => navigate("/contact")}
        >
          <SquareLibrary className="h-5 w-5" />
          <span>Contact</span>
        </Button>

        {token && (
          <Button
            className="hover:text-green-700 flex items-center space-x-2"
            onClick={() => navigate("/ai")}
          >
            <Bot className="h-5 w-5" />
            <span>AI</span>
          </Button>
        )}

        {!token && (
          <>
            <Button
              className="hover:text-green-700 flex items-center space-x-2"
              onClick={() => navigate("/auth/login")}
            >
              <LogInIcon className="h-5 w-5" />
              <span>Login</span>
            </Button>

            <Button
              className="hover:text-green-700 flex items-center space-x-2"
              onClick={() => navigate("/auth/register")}
            >
              <FaRegistered className="h-5 w-5" />
              <span>Register</span>
            </Button>
          </>
        )}


        {token && (
          <Button
            className="hover:text-green-700 flex items-center space-x-2"
            onClick={() => dispatch(logout())}
          >
            <LogOutIcon className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        )}

        <div className="relative">
          <Button
            className="hover:text-green-700 p-0 m-0"
            onClick={toggleDropdown}
          >
            <MoreVertical className="h-5 w-5" />
          </Button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white text-green-700 rounded-lg shadow-lg z-50">
              <div
                onClick={() => alert("Settings")}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer rounded-t-lg"
              >
                Settings
              </div>
              <div
                onClick={() => alert("Help")}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer"
              >
                Help
              </div>
              <div
                onClick={() => navigate("/about")}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer rounded-b-lg"
              >
                About
              </div>
            </div>
          )}
        </div>
      </div>







      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 right-0 w-48 bg-white text-green-700 rounded-lg shadow-lg z-50 md:hidden">
          <div onClick={() => window.location.href = 'https://pgportal.gov.in/'} className="px-4 py-2 hover:bg-green-100 cursor-pointer">Report</div>
          {token && <div onClick={() => window.location.href = 'https://www.plant.id/'} className="px-4 py-2 hover:bg-green-100 cursor-pointer">Scan</div>}
          {token && <div onClick={() => window.location.href = 'https://identify.plantnet.org/'} className="px-4 py-2 hover:bg-green-100 cursor-pointer">Track</div>}
          {token && <div onClick={() => window.location.href = 'https://www.plant.id/'} className="px-4 py-2 hover:bg-green-100 cursor-pointer">Upload</div>}
          <div onClick={() => window.location.href = ''} className="px-4 py-2 hover:bg-green-100 cursor-pointer">About</div>
          {token && <div onClick={() => navigate('/ai')} className="px-4 py-2 hover:bg-green-100 cursor-pointer">AI</div>}
          {!token && <div onClick={() => navigate('/auth/login')} className="px-4 py-2 hover:bg-green-100 cursor-pointer">Login</div>}
          {!token && <div onClick={() => navigate('/auth/register')} className="px-4 py-2 hover:bg-green-100 cursor-pointer">Register</div>}
          {token && <div onClick={() => dispatch(logout())} className="px-4 py-2 hover:bg-green-100 cursor-pointer">Logout</div>}
        </div>
      )}

















      {sidebarOpen && (
        <div className="fixed inset-0 z-40 ">
          <div className="fixed left-0 top-0 w-64  p-2 shadow-lg z-50 text-gray-900 overflow-y bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700">

            <button
              onClick={toggleSidebar}
              className="absolute top-6 right-6  text-2xl hover:text-green-500"
            >
              &times;
            </button>


            <div className="space-y-6 mt-12 text-green-500">
              <div
                className="cursor-pointer flex  items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                onClick={() => window.location.href = 'https://pgportal.gov.in/'}
              >
                <FileText className="h-5 w-5 text-green-500" />
                <span>Report</span>
              </div>

              {token && (
                <>
                  <div
                    className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                    onClick={() => window.location.href = 'https://www.plant.id/'}
                  >
                    <ScanLine className="h-5 w-5 text-green-500" />
                    <span>Scan</span>
                  </div>

                  <div
                    className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                    onClick={() => window.location.href = 'https://www.plant.id/'}
                  >
                    <ImageUp className="h-5 w-5 text-green-500" />
                    <span>Upload</span>
                  </div>
                </>
              )}

              <div
                className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                onClick={() => navigate("/about")}
              >
                <BookCopy className="h-5 w-5 text-green-500" />
                <span>About</span>
              </div>

              <div
                className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                onClick={() => navigate("/contact")}
              >
                <SquareLibrary className="h-5 w-5 text-green-500" />
                <span>Contact</span>
              </div>


              <div
                className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                onClick={() => navigate('/blog')}
              >
                <Logs className="h-5 w-5 text-green-500" />
                <span>Blogs</span>
              </div>

              <div
                className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                onClick={() => navigate('/blog/create')}
              >
                <PencilLine className="h-5 w-5 text-green-500" />
                <span>Create Blog</span>
              </div>

              <div
                className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                onClick={() => navigate('/item/create')}
              >
                <Tag className="h-5 w-5 text-green-500" />
                <span>Put Item for Sale</span>
              </div>

              <div
                className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                onClick={() => navigate('/item/listings')}
              >
                <ShoppingCart className="h-5 w-5 text-green-500" />
                <span>Sell List of Items</span>
              </div>


              {!token && (
                <>
                  <div
                    className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                    onClick={() => navigate('/auth/login')}
                  >
                    <LogInIcon className="h-5 w-5 text-green-500" />
                    <span>Login</span>
                  </div>

                  <div
                    className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                    onClick={() => navigate('/auth/register')}
                  >
                    <FaRegistered className="h-5 w-5 text-green-500" />
                    <span>Register</span>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}















    </nav>
  );
}


const navStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 10,

  // Elevation effect
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', 
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)', 
  backgroundColor: 'rgba(255, 255, 255, 0.95)', 

  // Optional: smooth transitions
  transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
};



export default NavBar;
