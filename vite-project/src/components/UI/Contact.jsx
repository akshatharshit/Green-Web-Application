import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-6 py-12 ">
      <div className="bg-gradient-to-r from-green-200 via-green-100 to-green-200  w-full max-w-3xl  shadow-lg rounded-lg p-8 relative">
        <div className="absolute top-0 left-0 right-0 h-2  rounded-t-lg" />
        
        <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">Get in Touch with Nature 🌿</h1>
        <p className="text-gray-700 mb-6 text-center">
          Have questions, ideas, or just want to say hello? We’d love to hear from you. Let's grow together!
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-green-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full text-gray-700 px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 text-gray-700  py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Your message..."
              className="w-full px-4 text-gray-700  py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-gray-700  font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Send Message 🌱
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-700">
          
        </div>
      </div>
    </div>
  );
}

export default Contact;
