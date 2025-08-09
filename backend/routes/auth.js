import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // ✅ Send welcome email
        try {
            const info = await sendEmail(
                email,
                'Welcome to Green Life 🌿',
                `Welcome to Green Life! 🌱

We're thrilled to have you on board. You've successfully logged into your account, and you're now part of a growing community that cares about nature, sustainability, and making the planet greener.

Explore our features, connect with like-minded individuals, and let's grow together — one leaf at a time. 🍃

If you did not initiate this login, please secure your account immediately.

Happy Growing! 🌼
– The Green Life Team`
            );
            console.log('✅ Welcome email sent!', info.messageId);
        } catch (emailErr) {
            console.error('❌ Failed to send welcome email:', emailErr.message);
        }

        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});










// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Received email:', email); // Log the incoming email to ensure it's being received correctly

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        console.log('Login successful');
        res.status(200).json({
            token,
            user: {
                _id: user._id, // ✅ This ensures your frontend gets the right ID
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;
