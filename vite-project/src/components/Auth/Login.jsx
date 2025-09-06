import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { Mail, Lock } from "lucide-react";
import f from "../../assets/Fram.jpg";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${f})`,
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Left: Welcome Message */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-10 relative z-10 text-white">
        <h1 className="text-4xl font-extrabold drop-shadow-lg mb-6 text-center">
          Welcome 🌱
        </h1>
        <p className="text-xl mb-4 text-center">
          "Grow with us and make farming smarter."
        </p>
        <p className="text-lg mb-2">🌾  <span className="font-semibold">स्वागत है, हमारे साथ खेती को स्मार्ट बनाइए।</span></p>
        <p className="text-lg mb-2">🌾  <span className="font-semibold">ସ୍ବାଗତ, ଆମ ସହିତ କୃଷିକୁ ସ୍ମାର୍ଟ କରନ୍ତୁ।</span></p>
      </div>

      {/* Right: Login Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-6 relative z-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-green-200"
        >
          <h2 className="text-4xl font-extrabold text-green-800 text-center mb-8">
            Login to Continue
          </h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          {/* Email */}
          <div className="relative mb-5">
            <Mail className="absolute left-3 top-3.5 text-green-700 w-5 h-5" />
            <input
              className="w-full pl-10 pr-3 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-700"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <Lock className="absolute left-3 top-3.5 text-green-700 w-5 h-5" />
            <input
              className="w-full pl-10 pr-3 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-700"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Extra Links */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/auth/register")}
              className="text-green-700 font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
