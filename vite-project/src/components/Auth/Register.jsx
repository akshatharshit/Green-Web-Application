import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../slices/authSlice';
import Lottie4 from './Lottie4';


function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const { loading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
    navigate('/');
  };

  return (
    <>
   
      <div className="flex h-screen ">
       
        <div className="w-1/2 flex justify-center items-center p-10">
          <Lottie4 className="w-full max-w-md" />
        </div>

        
        <div className="w-1/2 flex justify-center items-center">
          <form
            onSubmit={handleRegister}
            className=" p-10 rounded-2xl shadow-lg w-full max-w-md"
          >
            <h2 className="text-3xl font-semibold text-green-800 text-center mb-6">
              Create Account 🌱
            </h2>
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            <input
              name="username"
              className="w-full p-3 text-white mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              className="w-full p-3 mb-4 border text-white border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              className="w-full p-3 mb-6 border text-white border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Password"
              onChange={handleChange}
            />
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium p-3 rounded-lg transition duration-200"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
      
    </>
  );
}

export default Register;
