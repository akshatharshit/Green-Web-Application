// geminiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// --- Async thunk for sending message ---
export const sendMessageToGemini = createAsyncThunk(
  "chat/sendMessageToGemini",
  async (userText, { getState, rejectWithValue }) => {
    try {
      const apiKey = GEMINI_API_KEY;
      if (!apiKey) return rejectWithValue("API key missing. Please contact admin.");

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userText }] }],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Gemini API error:", data);
        return rejectWithValue(data?.error?.message || "Unknown API error");
      }

      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "🤖 Sorry, I didn’t understand that.";

      return { userText, botReply };
    } catch (error) {
      console.error("Gemini fetch error:", error);
      return rejectWithValue("Gemini error: Could not fetch response. Try again later.");
    }
  }
);

// --- Slice ---
const initialState = {
  messages: JSON.parse(localStorage.getItem("chatMessages")) || [
    { role: "bot", text: "Hello! How can I help you today?" },
  ],
  loading: false,
  error: null,
};

const geminiSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [{ role: "bot", text: "Hello! How can I help you today?" }];
      state.error = null;
      localStorage.setItem("chatMessages", JSON.stringify(state.messages));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToGemini.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.messages.push({ role: "user", text: action.meta.arg });
        state.messages.push({ role: "bot", text: "⏳ Thinking..." });
        localStorage.setItem("chatMessages", JSON.stringify(state.messages));
      })
      .addCase(sendMessageToGemini.fulfilled, (state, action) => {
        state.loading = false;
        // remove placeholder
        state.messages = state.messages.filter((msg) => msg.text !== "⏳ Thinking...");
        state.messages.push({ role: "bot", text: action.payload.botReply });
        localStorage.setItem("chatMessages", JSON.stringify(state.messages));
      })
      .addCase(sendMessageToGemini.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages = state.messages.filter((msg) => msg.text !== "⏳ Thinking...");
        state.messages.push({ role: "bot", text: `❌ ${action.payload}` });
        localStorage.setItem("chatMessages", JSON.stringify(state.messages));
      });
  },
});

export const { clearMessages } = geminiSlice.actions;
export default geminiSlice.reducer;
