import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  // --- MODIFICATION START ---
  teamName: String, // To store the team name
  // --- MODIFICATION END ---
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
  track: String,
  member1Gender: String,
  member2Gender: String,
  member3Gender: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Participant || mongoose.model('Participant', participantSchema);