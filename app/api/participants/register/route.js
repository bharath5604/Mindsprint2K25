import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Participant from '@/lib/models/Participant';
import { sendMail } from '@/lib/mailer';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      collegeName, city, state, department, teamSize,
      member1, member2, member3, member1Phone, email, problemLink,
      // --- MODIFICATIONS START ---
      track, member1Gender, member2Gender, member3Gender
      // --- MODIFICATIONS END ---
    } = body;

    // 1. Basic validation for required fields
    const requiredFields = [collegeName, city, state, department, teamSize, member1, member1Phone, email, problemLink, track, member1Gender];
    if (requiredFields.some(field => !field)) {
      return NextResponse.json({ message: "Please fill all required fields." }, { status: 400 });
    }

    // --- MODIFICATIONS START ---
    // 2. Server-side validation for the "Femine Sakthi" track
    if (track === 'Femine Sakthi (Women Empowermen)') {
        if (member1Gender !== 'Female') {
            return NextResponse.json({ message: "Validation Error: For the Femine Sakthi track, Member 1 must be female." }, { status: 400 });
        }
        // Only validate members that are part of the team
        if (member2 && member2Gender !== 'Female') {
            return NextResponse.json({ message: "Validation Error: For the Femine Sakthi track, Member 2 must be female." }, { status: 400 });
        }
        if (member3 && member3Gender !== 'Female') {
            return NextResponse.json({ message: "Validation Error: For the Femine Sakthi track, Member 3 must be female." }, { status: 400 });
        }
    }
    // --- MODIFICATIONS END ---

    // 3. Build the query for the duplicate check dynamically
    const orConditions = [{ email: email }, { member1Phone: member1Phone }];
    const teamMembers = [member1, member2, member3].filter(Boolean);

    if (teamMembers.length > 0) {
      orConditions.push({
        $or: [
          { member1: { $in: teamMembers } },
          { member2: { $in: teamMembers } },
          { member3: { $in: teamMembers } }
        ]
      });
    }

    // 4. Execute the duplicate check query
    const existing = await Participant.findOne({ $or: orConditions });

    if (existing) {
      console.log("Duplicate registration blocked.", {
        submittedEmail: email,
        submittedPhone: member1Phone,
        submittedMembers: teamMembers,
        foundMatch: existing 
      });
      return NextResponse.json({ message: "Error: Email, phone, or a team member is already registered!" }, { status: 400 });
    }

    // 5. If no duplicates, proceed with saving the new participant
    const participant = new Participant(body);
    await participant.save();

    // --- MODIFICATIONS START ---
    // 6. Update email content to include the selected track
    const subject = "✅ Mindsprint 2K25 Registration Successful";
    const text = `Hello ${participant.member1},\n\nYou have successfully registered for Mindsprint 2K25 under the track: ${participant.track}.\n\nThank you!`;
    const html = `<p>Hello <b>${participant.member1}</b>,</p><p>You have successfully registered for <b>Mindsprint 2K25</b> under the track: <b>${participant.track}</b>.</p><p>Thank you for registering!</p>`;
    // --- MODIFICATIONS END ---
    
    await sendMail(participant.email, subject, text, html);

    return NextResponse.json({ message: "Registration successful! Confirmation email sent." });
  } catch (err) {
    console.error("Registration API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}