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

    const requiredFields = [collegeName, city, state, department, teamName, teamSize, member1, member1Phone, email, problemLink, track, member1Gender];
    if (requiredFields.some(field => !field)) {
      return NextResponse.json({ message: "Please fill all required fields." }, { status: 400 });
    }

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

    // --- MODIFICATION START: Advanced Duplicate Check with Field-Specific Errors ---
    
    const normalizeString = (str) => str ? str.trim().toLowerCase() : null;

    const normalizedTeamName = normalizeString(teamName);
    const normalizedEmail = normalizeString(email);
    const teamMembers = [member1, member2, member3].map(normalizeString).filter(Boolean);
      
    const teamNameRegex = new RegExp(`^${normalizedTeamName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i');
    const emailRegex = new RegExp(`^${normalizedEmail.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i');
    const memberRegexes = teamMembers.map(m => new RegExp(`^${m.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i'));

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
    
    const existing = await Participant.findOne({ $or: orConditions });

    if (existing) {
      if (teamNameRegex.test(existing.teamName)) {
        return NextResponse.json({ message: "This Team Name is already taken.", field: "teamName" }, { status: 400 });
      }
      if (emailRegex.test(existing.email)) {
        return NextResponse.json({ message: "This Email is already registered.", field: "email" }, { status: 400 });
      }
      if (existing.member1Phone === member1Phone) {
        return NextResponse.json({ message: "This Phone Number is already registered.", field: "member1Phone" }, { status: 400 });
      }
      // For member names, a general error is clearer.
      return NextResponse.json({ message: "A team member's name is already registered in another team." }, { status: 400 });
    }
    // --- MODIFICATION END ---

    const participant = new Participant(body);
    await participant.save();

    const subject = "✅ Mindsprint 2K25 Registration Successful";
    const text = `Hello ${participant.member1} from team "${participant.teamName}",\n\nYou have successfully registered...`;
    const html = `<p>Hello <b>${participant.member1}</b> from team "<b>${participant.teamName}</b>",...</p>`;
    
    await sendMail(participant.email, subject, text, html);

    return NextResponse.json({ message: "Registration successful! Confirmation email sent." });
  } catch (err) {
    console.error("Registration API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}