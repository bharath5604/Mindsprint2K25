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
  // --- MODIFICATIONS START ---
  track: String, // To store the selected hackathon track
  member1Gender: String,
  member2Gender: String,
  member3Gender: String,
  // --- MODIFICATIONS END ---
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Participant || mongoose.model('Participant', participantSchema);