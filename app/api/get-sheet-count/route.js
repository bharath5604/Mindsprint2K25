// File Path: app/api/get-sheet-count/route.js

import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensures the route is always run dynamically

export async function GET() {
  try {
    // --- STEP 1: Configure Your Sheet Details ---
    // IMPORTANT: Change these two values to match your spreadsheet.
    const sheetName = 'RazorPay'; // The exact name of the sheet/tab (e.g., "Sheet1", "Registrations")
    const hasHeader = true;             // Set to 'true' if the first row is titles like "Name", "Email", etc.

    // --- No changes needed below this line ---

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        // The replace function is crucial for Vercel to correctly read the private key
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // We will count all entries in the first column (A) to determine the number of records.
    const range = `${sheetName}!A:A`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: range,
    });

    const values = response.data.values;
    let count = 0;

    if (values) {
      const totalRows = values.filter(row => row.length > 0 && row[0].trim() !== '').length;
      // Subtract 1 if there's a header, otherwise use the total row count
      count = hasHeader ? totalRows - 1 : totalRows;
    }

    // Ensure count is never negative
    if (count < 0) {
      count = 0;
    }
    
    // We will revalidate the data every 60 seconds.
    return NextResponse.json({ count: count.toString() }, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    });

  } catch (error) {
    console.error('Error fetching sheet count:', error.message);
    return NextResponse.json({ count: 'N/A', error: 'Failed to fetch data' }, { status: 500 });
  }
}