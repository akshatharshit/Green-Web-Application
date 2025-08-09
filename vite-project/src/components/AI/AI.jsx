
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

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

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
    <div className="max-w-3xl mx-auto p-6 mt-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-white tracking-tight">🤖 AI ChatBot</h2>
        <p className="text-sm text-gray-400">Powered by Gemini AI</p>
      </div>

      <div className="h-[400px] overflow-y-auto bg-white rounded-xl p-4 shadow-inner space-y-3 scroll-smooth">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-md ${
                msg.sender === 'user'
                  ? 'bg-green-100 text-right text-gray-800'
                  : 'bg-blue-100 text-left text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-center text-sm text-gray-500 italic">AI is typing...</div>
        )}
        {error && (
          <div className="text-center text-red-600 font-semibold text-sm">{error}</div>
        )}
        <div ref={messageEndRef} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Ask me something..."
          className="flex-1 px-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-800"
        />
        <button
          onClick={handleSendClick}
          className="p-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
          aria-label="Send message"
        >
          <FaPaperPlane size={18} />
        </button>
      </div>
    </div>
  );
}

export default AI;
