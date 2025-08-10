import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import itemRoutes from './routes/items.js';
import blogRoutes from './routes/blog.js';
import leaderBlog from './routes/submissionRoutes.js';
import testimonialRoutes from './routes/testimonials.js';
import upiRoutes from './routes/upi.js';
import  plantRoutes from "./routes/plants.js"

dotenv.config();
const app = express();

// ✅ Secure CORS: Allow only frontend URL
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // if you're using cookies or Authorization headers
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/submission', leaderBlog);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/upi', upiRoutes);
app.use("/api/plants", plantRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(process.env.PORT || 5000, () => {
            console.log(`🚀 Server started on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => {
        console.error("❌ DB Connection Error:", err.message);
        process.exit(1); // Exit the process if DB fails to connect
    });
