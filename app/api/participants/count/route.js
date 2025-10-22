import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Participant from '@/lib/models/Participant';
export const dynamic = 'force-dynamic';
export async function GET() {
  await dbConnect();
  try {
    const count = await Participant.countDocuments();
    return NextResponse.json({ count });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ count: 0, message: 'Server error' }, { status: 500 });
  }
}