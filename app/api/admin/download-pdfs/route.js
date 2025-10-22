import { Readable } from 'stream';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Participant from '@/lib/models/Participant';
import archiver from 'archiver';
import { verifyAuth } from '@/lib/middleware/authMiddleware';

// Helper to convert Node.js stream to Web Stream
function streamToWeb(stream) {
  return new ReadableStream({
    start(controller) {
      stream.on('data', chunk => controller.enqueue(chunk));
      stream.on('end', () => controller.close());
      stream.on('error', err => controller.error(err));
    },
  });
}

export async function GET(request) {
  const authResult = await verifyAuth(request);
  if (authResult) return authResult;

  await dbConnect();

  const archive = archiver('zip', { zlib: { level: 9 } });

  const stream = new Readable().wrap(archive);

  (async () => {
    try {
      const participants = await Participant.find().lean();
      let index = 1;

      for (const p of participants) {
        if (p.problemLink) {
          try {
            let pdfUrl = p.problemLink;
            const driveMatch = pdfUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (driveMatch) {
              pdfUrl = `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
            }

            const response = await fetch(pdfUrl);
            if (!response.ok) continue;

            const buffer = await response.arrayBuffer();
            const safeEmail = p.email.replace(/[@.]/g, '_');
            const filename = `participant_${index}_${safeEmail}.pdf`;
            archive.append(Buffer.from(buffer), { name: filename });
            index++;
          } catch (err) {
            console.warn(`Error fetching PDF for ${p.email}:`, err);
          }
        }
      }
    } catch (error) {
      console.error('Error processing participants:', error);
    } finally {
      archive.finalize();
    }
  })();

  const webStream = streamToWeb(stream);

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=all_pdfs.zip',
    },
  });
}