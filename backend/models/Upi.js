import mongoose from "mongoose";

const upiSchema = new mongoose.Schema(
  {
    upiId: { type: String, required: true },
    qrImage: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hasFilled: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Upi", upiSchema);
