import { NextResponse } from 'next/server'; // <-- CORRECT
import dbConnect from '@/lib/dbConnect';
import Participant from '@/lib/models/Participant'; // <-- CORRECT
import { sendMail } from '@/lib/mailer';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      collegeName, city, state, department, teamSize,
      member1, member2, member3, member1Phone, email, problemLink
    } = body;

    // 1. Basic validation for required fields
    if (!collegeName || !city || !state || !department || !teamSize || !member1 || !member1Phone || !email || !problemLink) {
      return NextResponse.json({ message: "Please fill all required fields." }, { status: 400 });
    }

    // 2. Build the query for the duplicate check dynamically
    const orConditions = [];

    // Always check for the primary email and phone number
    orConditions.push({ email: email });
    orConditions.push({ member1Phone: member1Phone });

    // Create an array of all team members who have a non-empty name
    const teamMembers = [member1, member2, member3].filter(Boolean); // filter(Boolean) removes empty strings, null, undefined

    if (teamMembers.length > 0) {
      // This condition checks if any of the provided team member names
      // already exist in ANY of the member name fields of a document.
      orConditions.push({
        $or: [
          { member1: { $in: teamMembers } },
          { member2: { $in: teamMembers } },
          { member3: { $in: teamMembers } }
        ]
      });
    }

    // 3. Execute the duplicate check query
    const existing = await Participant.findOne({ $or: orConditions });

    if (existing) {
      // Log what caused the duplicate for easier debugging
      console.log("Duplicate registration blocked.", {
        submittedEmail: email,
        submittedPhone: member1Phone,
        submittedMembers: teamMembers,
        foundMatch: existing 
      });
      return NextResponse.json({ message: "Error: Email, phone, or a team member is already registered!" }, { status: 400 });
    }

    // 4. If no duplicates, proceed with saving the new participant
    const participant = new Participant(body);
    await participant.save();

    const subject = "✅ Mindsprint 2K25 Registration Successful";
    const text = `Hello ${participant.member1},\n\nYou have successfully registered for Mindsprint 2K25.\n\nThank you!`;
    const html = `<p>Hello <b>${participant.member1}</b>,</p><p>You have successfully registered for <b>Mindsprint 2K25</b>.</p><p>Thank you for registering!</p>`;
    
    // We don't need to `await` this, it can run in the background
    sendMail(participant.email, subject, text, html);

    return NextResponse.json({ message: "Registration successful! Confirmation email sent." });
  } catch (err) {
    console.error("Registration API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}