import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Participant from '@/lib/models/Participant';
import { verifyAuth } from '@/lib/middleware/authMiddleware';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  // First, secure the endpoint
  const authResult = await verifyAuth(request);
  if (authResult) return authResult;

  await dbConnect();
  
  try {
    // Use MongoDB's aggregation pipeline to group by track and count
    const trackAnalytics = await Participant.aggregate([
      {
        $group: {
          _id: '$track', // Group documents by the 'track' field
          count: { $sum: 1 } // Count the number of documents in each group
        }
      },
      {
        $sort: { count: -1 } // Optional: sort by the most popular tracks
      }
    ]);

    // The result is an array like [{ _id: 'Track Name', count: 10 }, ...]
    return NextResponse.json(trackAnalytics);

  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json({ message: "Server error while fetching analytics." }, { status: 500 });
  }
}






