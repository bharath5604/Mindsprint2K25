import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Participant from '@/lib/models/Participant';
import * as XLSX from 'xlsx';
import { verifyAuth } from '@/lib/middleware/authMiddleware';

export async function GET(request) {
  const authResult = await verifyAuth(request);
  if (authResult) return authResult;

  await dbConnect();
  try {
    const participants = await Participant.find().lean();
    
    // --- MODIFICATIONS START ---
    // Map data to include new fields for the Excel sheet
    const data = participants.map(p => ({
      College: p.collegeName,
      City: p.city,
      State: p.state,
      Department: p.department,
      Track: p.track, // ADDED
      TeamSize: p.teamSize,
      Member1: p.member1,
      Member1_Gender: p.member1Gender, // ADDED
      Member2: p.member2 || '', //test 
      Member2_Gender: p.member2Gender || '', // ADDED
      Member3: p.member3 || '',
      Member3_Gender: p.member3Gender || '', // ADDED
      Member1Phone: p.member1Phone,
      Email: p.email,
      ProblemLink: p.problemLink || '',
      RegisteredAt: p.createdAt,
    }));
    // --- MODIFICATIONS END ---

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Participants');
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename=participants.xlsx',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}