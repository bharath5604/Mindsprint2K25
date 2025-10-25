import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Participant from '@/lib/models/Participant';
import { sendMail } from '@/lib/mailer';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      collegeName, city, state, department, teamName, teamSize,
      member1, member2, member3, member1Phone, email, problemLink,
      track, member1Gender, member2Gender, member3Gender
    } = body;

    // 1. Basic validation for required fields
    const requiredFields = [collegeName, city, state, department, teamName, teamSize, member1, member1Phone, email, problemLink, track, member1Gender];
    if (requiredFields.some(field => !field)) {
      return NextResponse.json({ message: "Please fill all required fields." }, { status: 400 });
    }

    // 2. Server-side validation for the "Femine Sakthi" track
    if (track === 'Femine Sakthi (Women Empowermen)') {
        if (member1Gender !== 'Female') {
            return NextResponse.json({ message: "Validation Error: For the Femine Sakthi track, Member 1 must be female." }, { status: 400 });
        }
        if (member2 && member2Gender !== 'Female') {
            return NextResponse.json({ message: "Validation Error: For the Femine Sakthi track, Member 2 must be female." }, { status: 400 });
        }
        if (member3 && member3Gender !== 'Female') {
            return NextResponse.json({ message: "Validation Error: For the Femine Sakthi track, Member 3 must be female." }, { status: 400 });
        }
    }

    // --- MODIFICATION START: Advanced Duplicate Check ---
    
    // Helper function to normalize strings (trim spaces, convert to lowercase)
    const normalizeString = (str) => str ? str.trim().toLowerCase() : null;

    // Normalize all relevant incoming data
    const normalizedTeamName = normalizeString(teamName);
    const normalizedEmail = normalizeString(email);
    const teamMembers = [member1, member2, member3]
      .map(normalizeString)
      .filter(Boolean);
      
    // Create an array of regular expressions for case-insensitive matching
    const teamNameRegex = new RegExp(`^${normalizedTeamName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i');
    const emailRegex = new RegExp(`^${normalizedEmail.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i');
    const memberRegexes = teamMembers.map(m => new RegExp(`^${m.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i'));

    // Build the query for the duplicate check dynamically
    const orConditions = [
      { email: emailRegex },
      { teamName: teamNameRegex },
      { member1Phone: member1Phone }
    ];

    if (memberRegexes.length > 0) {
      orConditions.push(
        { member1: { $in: memberRegexes } },
        { member2: { $in: memberRegexes } },
        { member3: { $in: memberRegexes } }
      );
    }
    
    // Find any participant that matches any of the conditions
    const existing = await Participant.findOne({ $or: orConditions });

    if (existing) {
      // Check which field caused the duplicate and send a specific error message
      if (teamNameRegex.test(existing.teamName)) {
        return NextResponse.json({ message: "Error: This Team Name is already registered!" }, { status: 400 });
      }
      if (emailRegex.test(existing.email)) {
        return NextResponse.json({ message: "Error: This Email is already registered!" }, { status: 400 });
      }
      if (existing.member1Phone === member1Phone) {
        return NextResponse.json({ message: "Error: This Phone Number is already registered!" }, { status: 400 });
      }
      // If none of the above, a team member name must be the duplicate
      return NextResponse.json({ message: "Error: A team member's name is already registered in another team!" }, { status: 400 });
    }

    // --- MODIFICATION END ---

    // 5. If no duplicates, proceed with saving the new participant
    const participant = new Participant(body);
    await participant.save();

    // 6. Update email content to include the Team Name and Track
    const subject = "✅ Mindsprint 2K25 Registration Successful";
    const text = `Hello ${participant.member1} from team "${participant.teamName}",\n\nYou have successfully registered for Mindsprint 2K25 under the track: ${participant.track}.\n\nThank you for registering!`;
    const html = `<p>Hello <b>${participant.member1}</b> from team "<b>${participant.teamName}</b>",</p><p>You have successfully registered for <b>Mindsprint 2K25</b> under the track: <b>${participant.track}</b>.</p><p>Thank you for registering!</p>`;
    
    await sendMail(participant.email, subject, text, html);

    return NextResponse.json({ message: "Registration successful! Confirmation email sent." });
  } catch (err) {
    console.error("Registration API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}