import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Submission', submissionSchema);
