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

    const normalizeString = (str) => str ? str.trim().toLowerCase() : null;

    // --- MODIFICATION: Separate, individual checks for each field ---

    // 1. Check Team Name (Case-insensitive)
    const teamNameRegex = new RegExp(`^${normalizeString(teamName).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i');
    if (await Participant.findOne({ teamName: teamNameRegex })) {
      return NextResponse.json({ message: "This Team Name is already taken.", field: "teamName" }, { status: 400 });
    }

    // 2. Check Email (Case-insensitive)
    const emailRegex = new RegExp(`^${normalizeString(email).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i');
    if (await Participant.findOne({ email: emailRegex })) {
      return NextResponse.json({ message: "This Email is already registered.", field: "email" }, { status: 400 });
    }

    // 3. Check Phone Number
    if (await Participant.findOne({ member1Phone: member1Phone })) {
      return NextResponse.json({ message: "This Phone Number is already registered.", field: "member1Phone" }, { status: 400 });
    }

    // 4. Check Problem Statement Link
    if (await Participant.findOne({ problemLink: problemLink })) {
      return NextResponse.json({ message: "This Problem Statement link has already been submitted.", field: "problemLink" }, { status: 400 });
    }

    // 5. Check each Team Member individually
    const members = [
      { name: member1, field: 'member1' },
      { name: member2, field: 'member2' },
      { name: member3, field: 'member3' },
    ];

    for (const member of members) {
      if (member.name) {
        const normalizedName = normalizeString(member.name);
        const memberRegex = new RegExp(`^${normalizedName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i');
        const existingMember = await Participant.findOne({
          $or: [
            { member1: memberRegex },
            { member2: memberRegex },
            { member3: memberRegex },
          ]
        });
        if (existingMember) {
          return NextResponse.json({ message: `"${member.name}" is already registered in another team.`, field: member.field }, { status: 400 });
        }
      }
    }

    // All checks passed, proceed with saving
    const participant = new Participant(body);
    await participant.save();

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