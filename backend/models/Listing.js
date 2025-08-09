import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // Cloudinary URL
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reviews: [reviewSchema],
}, { timestamps: true });

export default mongoose.model("Listing", listingSchema);
