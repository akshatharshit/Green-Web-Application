import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/authSlice';
import Lottie3 from './Lottie3';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <>
    
    <div className="flex h-screen ">
      {/* Left: Animation */}
      <div className="w-1/2 flex justify-center items-center p-10">
        <Lottie3 loop={true} className="w-full max-w-md" />
      </div>

      {/* Right: Login Form */}
      <div className="w-1/2 flex justify-center items-center">
        <form
          onSubmit={handleLogin}
          className=" p-10 rounded-2xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-3xl font-semibold text-green-800 text-center mb-6">
            Welcome Back 🌿
          </h2>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <input
            className="w-full p-3 mb-4 border text-white border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 mb-6 border text-white border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium p-3 rounded-lg transition duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
    
    </>
  );
}

export default Login;
