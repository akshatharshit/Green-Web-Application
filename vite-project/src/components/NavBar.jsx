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
  SquareLibrary,
  Dot
} from "lucide-react";
import { FaRegistered } from "react-icons/fa";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import f from "../assets/Logo.png"

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
    <nav style={navStyle} className="flex items-center justify-between px-4 py-4  text-green-400 shadow-lg relative bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800">
      {/* Left - Sidebar Toggle and Logo */}
      <div className="flex items-center space-x-4 ">
        {/* Sidebar Toggle Icon */}
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <Menu className="h-6 w-6" /> {/* Menu icon to toggle sidebar */}
        </button>

        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src={f}
            alt="Logo"
            className="h-14 w-14 rounded-full p-2"
          />
          <span className="text-3xl text-amber-50 font-bold tracking-wider italic">
            MatiBandhu
          </span>
        </a>


      </div>



      {/* Right - Nav */}
      <div className="hidden md:flex items-center space-x-6">


        {token && (
          <>


            {/* <Button
              className="hover:text-green-600 flex items-center space-x-2"
              onClick={() => window.location.href = "https://identify.plantnet.org/"}
            >
              <MapPinned className="h-5 w-5" />
              <span>Track</span>
            </Button> */}

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
          onClick={() => navigate("/disease")}
        >
          <BookCopy className="h-5 w-5" />
          <span>Crop Disease</span>
        </Button>


        <Button
          className="hover:text-green-700 flex items-center space-x-2"
          onClick={() => navigate("/FertilizerPredictor")}
        >
          <BookCopy className="h-5 w-5" />
          <span>Fertilizer</span>
        </Button>

        <Button
          className="hover:text-green-700 flex items-center space-x-2"
          onClick={() => navigate("/crop")}
        >
          <BookCopy className="h-5 w-5" />
          <span>Soil Crop</span>
        </Button>


        {/* <Button
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
        </Button> */}

        {/* {token && (
          <Button
            className="hover:text-green-700 flex items-center space-x-2"
            onClick={() => navigate("/img")}
          >
            <Bot className="h-5 w-5" />
            <span>AI Image</span>
          </Button>
        )} */}

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

              <div
                onClick={() => navigate("/weed")}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer rounded-b-lg"
              >
                Detector
              </div>
            </div>
          )}
        </div>
      </div>






      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-green-700 focus:outline-none"
        >
          <MoreVertical className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 right-4 w-56 bg-white/95 backdrop-blur-md text-green-800 rounded-2xl shadow-2xl border border-green-100 z-50 md:hidden">
          <ul className="flex flex-col py-2">
            <li
              onClick={() => window.location.href = 'https://pgportal.gov.in/'}
              className="px-5 py-3 flex items-center gap-3 hover:bg-green-50 rounded-lg transition cursor-pointer"
            >
              📝 Report
            </li>

            {token && (
              <li
                onClick={() => window.location.href = 'https://www.plant.id/'}
                className="px-5 py-3 flex items-center gap-3 hover:bg-green-50 rounded-lg transition cursor-pointer"
              >
                🌱 Scan
              </li>
            )}

            {token && (
              <li
                onClick={() => window.location.href = 'https://identify.plantnet.org/'}
                className="px-5 py-3 flex items-center gap-3 hover:bg-green-50 rounded-lg transition cursor-pointer"
              >
                📍 Track
              </li>
            )}

            {token && (
              <li
                onClick={() => window.location.href = 'https://www.plant.id/'}
                className="px-5 py-3 flex items-center gap-3 hover:bg-green-50 rounded-lg transition cursor-pointer"
              >
                ⬆️ Upload
              </li>
            )}

            <li
              onClick={() => window.location.href = ''}
              className="px-5 py-3 flex items-center gap-3 hover:bg-green-50 rounded-lg transition cursor-pointer"
            >
              ℹ️ About
            </li>

            {token && (
              <li
                onClick={() => navigate('/ai')}
                className="px-5 py-3 flex items-center gap-3 hover:bg-green-50 rounded-lg transition cursor-pointer"
              >
                🤖 AI
              </li>
            )}

            {!token && (
              <li
                onClick={() => navigate('/auth/login')}
                className="px-5 py-3 flex items-center gap-3 hover:bg-green-50 rounded-lg transition cursor-pointer"
              >
                🔑 Login
              </li>
            )}

            {!token && (
              <li
                onClick={() => navigate('/auth/register')}
                className="px-5 py-3 flex items-center gap-3 hover:bg-green-50 rounded-lg transition cursor-pointer"
              >
                🆕 Register
              </li>
            )}

            {token && (
              <li
                onClick={() => dispatch(logout())}
                className="px-5 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
              >
                🚪 Logout
              </li>
            )}
          </ul>
        </div>
      )}


















      {sidebarOpen && (
  <div className="fixed inset-0 z-40 bg-black/40 ">
    <div className="fixed left-0 top-0 w-72 h-full p-4 shadow-2xl z-50 text-gray-100 bg-gradient-to-b from-gray-800 via-gray-900 to-black border-r border-gray-700">
      
      {/* Close Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-6 right-6 text-3xl text-gray-300 hover:text-green-400 transition-colors"
      >
        &times;
      </button>

      {/* Logo / Title */}
      <div className="mt-8 mb-10 px-3">
        <h1 className="text-2xl font-bold text-green-400 tracking-wide">
          🌱 MatiBandhu
        </h1>
        <p className="text-sm text-gray-400">Smart Farming Assistant</p>
      </div>

      {/* Menu */}
      <div className="space-y-3 text-green-400">
        <div
          className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-green-900/30 rounded-xl transition"
          onClick={() => window.location.href = 'https://pgportal.gov.in/'}
        >
          <FileText className="h-5 w-5" />
          <span>Report</span>
        </div>

        {token && (
          <>
            <div
              className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-green-900/30 rounded-xl transition"
              onClick={() => window.location.href = 'https://www.plant.id/'}
            >
              <ScanLine className="h-5 w-5" />
              <span>Scan</span>
            </div>

            <div
              className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-green-900/30 rounded-xl transition"
              onClick={() => window.location.href = 'https://www.plant.id/'}
            >
              <ImageUp className="h-5 w-5" />
              <span>Upload</span>
            </div>
          </>
        )}

        <div
          className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-green-900/30 rounded-xl transition"
          onClick={() => navigate("/about")}
        >
          <BookCopy className="h-5 w-5" />
          <span>About</span>
        </div>

        <div
          className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-green-900/30 rounded-xl transition"
          onClick={() => navigate("/contact")}
        >
          <SquareLibrary className="h-5 w-5" />
          <span>Contact</span>
        </div>

        <div
          className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-green-900/30 rounded-xl transition"
          onClick={() => navigate('/blog')}
        >
          <Logs className="h-5 w-5" />
          <span>Blogs</span>
        </div>

        <div
          className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-green-900/30 rounded-xl transition"
          onClick={() => navigate('/blog/create')}
        >
          <PencilLine className="h-5 w-5" />
          <span>Create Blog</span>
        </div>

        <div
          className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-green-900/30 rounded-xl transition"
          onClick={() => navigate('/item/create')}
        >
          <Tag className="h-5 w-5" />
          <span>Put Item for Sale</span>
        </div>

        <div
          className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-green-900/30 rounded-xl transition"
          onClick={() => navigate('/item/listings')}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Sell List of Items</span>
        </div>

        {!token && (
          <>
            <div
              className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-green-900/30 rounded-xl transition"
              onClick={() => navigate('/auth/login')}
            >
              <LogInIcon className="h-5 w-5" />
              <span>Login</span>
            </div>

            <div
              className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-green-900/30 rounded-xl transition"
              onClick={() => navigate('/auth/register')}
            >
              <FaRegistered className="h-5 w-5" />
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
