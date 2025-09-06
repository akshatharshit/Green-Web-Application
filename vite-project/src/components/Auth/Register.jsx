import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import { User, Mail, Lock } from "lucide-react";
import f from "../../assets/Fram.jpg";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={f}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative flex h-full">
        {/* Left: Welcome Message */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-10 text-white z-10 text-center">
          <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4">
            Join Us 🌱
          </h1>
          <p className="text-xl mb-6 italic text-green-100">
            "Be part of the future of smart farming."
          </p>

          {/* Multilingual Welcome */}
          <div className="space-y-3 mb-6">
            <p className="text-lg">
              🌾{" "}
              <span className="font-semibold">
                खाता बनाएं और हमारे साथ खेती को स्मार्ट बनाइए।
              </span>
            </p>
            <p className="text-lg">
              🌾{" "}
              <span className="font-semibold">
                ଆମ ସହିତ ଯୋଗ ଦିଅନ୍ତୁ, କୃଷିକୁ ସ୍ମାର୍ଟ କରନ୍ତୁ।
              </span>
            </p>
            <p className="text-lg">
              🌾{" "}
              <span className="font-semibold">
                Create your account and grow smarter with us.
              </span>
            </p>
          </div>

          {/* Benefits / Highlights */}
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-300/40 max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-green-200">Why Join?</h3>
            <ul className="space-y-2 text-left">
              <li className="flex items-center gap-2">
                ✅ <span>Access personalized crop recommendations</span>
              </li>
              <li className="flex items-center gap-2">
                ✅ <span>Track your farm’s growth with smart analytics</span>
              </li>
              <li className="flex items-center gap-2">
                ✅ <span>Connect with a community of progressive farmers</span>
              </li>
            </ul>
          </div>

          {/* Tagline */}
          <p className="mt-8 text-lg font-semibold text-green-100 drop-shadow">
            🌍 Together, let’s build a sustainable farming future.
          </p>
        </div>


        {/* Right: Register Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center p-6 z-10">
          <form
            onSubmit={handleRegister}
            className="w-full max-w-md bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-green-200"
          >
            <h2 className="text-4xl font-extrabold text-green-800 text-center mb-8">
              Create Account 🌿
            </h2>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            {/* Username */}
            <div className="relative mb-5">
              <User className="absolute left-3 top-3.5 text-green-700 w-5 h-5" />
              <input
                name="username"
                className="w-full pl-10 pr-3 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-700"
                placeholder="Enter your username"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="relative mb-5">
              <Mail className="absolute left-3 top-3.5 text-green-700 w-5 h-5" />
              <input
                name="email"
                type="email"
                className="w-full pl-10 pr-3 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-700"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <Lock className="absolute left-3 top-3.5 text-green-700 w-5 h-5" />
              <input
                name="password"
                type="password"
                className="w-full pl-10 pr-3 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-700"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>

            {/* Button */}
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Extra Links */}
            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/auth/login")}
                className="text-green-700 font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>

        
      </div>
    </div>
  );
}

export default Register;
