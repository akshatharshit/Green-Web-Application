import React, { useState, useEffect } from "react";
import {
  BookCopy,
  Bot,
  ImageUp,
  MapPinned,
  LogOutIcon,
  LogInIcon,
  ScanLine,
  FileText,
  Menu,
  Logs,
  PencilLine,
  ShoppingCart,
  Tag,
  SquareLibrary,
} from "lucide-react";
import { FaRegistered } from "react-icons/fa";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // sidebar toggle
  const toggleSidebar = () => setSidebarOpen((s) => !s);

  // scroll effect (keeps nav a bit darker once user scrolls)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NAVBAR (sticky, slightly smaller height, translucent) */}
      <nav
        className={
          "fixed top-0 left-0 right-0 z-40 max-w-[95%] mx-auto px-6 py-3 rounded-b-2xl flex items-center justify-between shadow-md transition-colors duration-300 " +
          (scrolled ? "bg-black/70 backdrop-blur-md" : "bg-black/30 backdrop-blur-sm")
        }
        aria-label="Main navigation"
      >
        {/* LEFT: menu + logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            aria-label="Open sidebar"
            className="text-green-300 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>

          <a href="/" className="flex items-center space-x-2">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/041/322/814/small/ai-generated-group-of-small-green-plants-growing-in-dirt-free-photo.jpeg"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-xl font-bold italic text-green-300">Green</span>
          </a>
        </div>

        {/* RIGHT: nav links (desktop) + auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {token && (
            <>
              <Button
                className="px-2 py-1 text-white/90 hover:text-white"
                onClick={() => (window.location.href = "https://identify.plantnet.org/")}
              >
                <MapPinned className="h-4 w-4 mr-2 inline" />
                Track
              </Button>

              <Button
                className="px-2 py-1 text-white/90 hover:text-white"
                onClick={() => (window.location.href = "https://www.plant.id/")}
              >
                <ImageUp className="h-4 w-4 mr-2 inline" />
                Upload
              </Button>
            </>
          )}

          <Button className="px-2 py-1 text-white/90 hover:text-white" onClick={() => navigate("/weather")}>
            <BookCopy className="h-4 w-4 mr-2 inline" /> Weather
          </Button>

          <Button className="px-2 py-1 text-white/90 hover:text-white" onClick={() => navigate("/disease")}>
            <BookCopy className="h-4 w-4 mr-2 inline" /> Crop Disease
          </Button>

          <Button className="px-2 py-1 text-white/90 hover:text-white" onClick={() => navigate("/FertilizerPredictor")}>
            <BookCopy className="h-4 w-4 mr-2 inline" /> Fertilizer
          </Button>

          <Button className="px-2 py-1 text-white/90 hover:text-white" onClick={() => navigate("/crop")}>
            <BookCopy className="h-4 w-4 mr-2 inline" /> Soil Crop
          </Button>

          {token && (
            <Button className="px-2 py-1 text-white/90 hover:text-white" onClick={() => navigate("/img")}>
              <Bot className="h-4 w-4 mr-2 inline" /> AI Image
            </Button>
          )}

          {/* Auth buttons styled like Subscriptions pill */}
          {!token && (
            <>
              <button
                onClick={() => navigate("/auth/login")}
                className="px-4 py-1.5 rounded-lg bg-transparent text-white border border-white/10 hover:bg-white hover:text-black hover:shadow-md transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/auth/register")}
                className="px-4 py-1.5 rounded-lg bg-transparent text-white border border-white/10 hover:bg-white hover:text-black hover:shadow-md transition"
              >
                Register
              </button>
            </>
          )}

          {token && (
            <button
              onClick={() => dispatch(logout())}
              className="px-4 py-1.5 rounded-lg bg-transparent text-white border border-white/10 hover:bg-white hover:text-black hover:shadow-md transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* SIDEBAR: sits above nav now (higher z-index), plus overlay to close by clicking outside */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          onClick={toggleSidebar} // clicking overlay closes
        >
          {/* overlay background */}
          <div className="absolute inset-0 bg-black/40" />

          {/* actual panel (stop propagation so clicks inside don't close) */}
          <div
            className="relative left-0 top-0 w-64 p-4 shadow-xl z-60 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-gray-900 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleSidebar}
              className="absolute top-3 right-3 text-2xl text-white"
              aria-label="Close sidebar"
            >
              &times;
            </button>

            <div className="space-y-6 mt-10 text-green-500">
              <div
                className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                onClick={() => (window.location.href = "https://pgportal.gov.in/")}
              >
                <FileText className="h-5 w-5 text-green-500" />
                <span>Report</span>
              </div>

              {token && (
                <>
                  <div
                    className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                    onClick={() => (window.location.href = "https://www.plant.id/")}
                  >
                    <ScanLine className="h-5 w-5 text-green-500" />
                    <span>Scan</span>
                  </div>

                  <div
                    className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                    onClick={() => (window.location.href = "https://www.plant.id/")}
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
                onClick={() => navigate("/blog")}
              >
                <Logs className="h-5 w-5 text-green-500" />
                <span>Blogs</span>
              </div>

              <div
                className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                onClick={() => navigate("/blog/create")}
              >
                <PencilLine className="h-5 w-5 text-green-500" />
                <span>Create Blog</span>
              </div>

              <div
                className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                onClick={() => navigate("/item/create")}
              >
                <Tag className="h-5 w-5 text-green-500" />
                <span>Put Item for Sale</span>
              </div>

              <div
                className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                onClick={() => navigate("/item/listings")}
              >
                <ShoppingCart className="h-5 w-5 text-green-500" />
                <span>Sell List of Items</span>
              </div>

              {!token && (
                <>
                  <div
                    className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                    onClick={() => navigate("/auth/login")}
                  >
                    <LogInIcon className="h-5 w-5 text-green-500" />
                    <span>Login</span>
                  </div>

                  <div
                    className="cursor-pointer flex items-center space-x-2 hover:bg-green-100 p-3 rounded-lg transition-colors"
                    onClick={() => navigate("/auth/register")}
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
    </>
  );
}

export default NavBar;
