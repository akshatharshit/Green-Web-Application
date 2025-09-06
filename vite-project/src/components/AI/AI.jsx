import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatResponse, addMessage } from '../../slices/chatbot';
import { FaPaperPlane } from 'react-icons/fa';

function AI() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);
  const [userInput, setUserInput] = useState('');
  const messageEndRef = useRef(null);

  const handleUserInputChange = (event) => setUserInput(event.target.value);

  const handleSendClick = () => {
    if (userInput.trim()) {
      dispatch(addMessage({ sender: 'user', text: userInput }));
      dispatch(fetchChatResponse(userInput));
      setUserInput('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && userInput.trim()) {
      handleSendClick();
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-12 bg-gradient-to-br from-green-900 via-gray-900 to-black rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-green-700/40">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent drop-shadow-md">
          🤖 AI ChatBot
        </h2>
        <p className="text-sm text-gray-400 mt-1">Powered by Gemini AI</p>
      </div>

      {/* Chat Messages */}
      <div className="h-[420px] overflow-y-auto bg-white/90 rounded-2xl p-5 shadow-inner space-y-4 scroll-smooth backdrop-blur-md border border-gray-200">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative px-4 py-2 rounded-2xl text-sm shadow-md animate-fadeIn ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-green-200 to-green-100 text-gray-800 rounded-br-none'
                  : 'bg-gradient-to-r from-blue-200 to-blue-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-center text-sm text-gray-500 italic animate-pulse">
            AI is typing...
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 font-semibold text-sm">{error}</div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-5 flex items-center gap-3 bg-white/20 backdrop-blur-lg p-3 rounded-2xl shadow-md border border-green-500/30">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <button
          onClick={handleSendClick}
          className="p-3 rounded-xl bg-green-600 text-white hover:bg-green-700 active:scale-95 transition-transform shadow-lg"
          aria-label="Send message"
        >
          <FaPaperPlane size={18} />
        </button>
      </div>
    </div>
  );
}

export default AI;
