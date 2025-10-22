import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  collegeName: String,
  city: String,
  state: String,
  department: String,
  teamSize: Number,
  member1: String,
  member2: String,
  member3: String,
  member1Phone: String,
  email: String,
  problemLink: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Participant || mongoose.model('Participant', participantSchema);