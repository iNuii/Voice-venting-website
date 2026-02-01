import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ['fullName', 'email', 'phone', 'age', 'occupation', 'urgency'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Setup Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Prepare row data
    const row = [
      new Date(body.timestamp).toLocaleString('th-TH'),
      body.fullName,
      body.email,
      body.phone,
      body.age,
      body.occupation,
      body.interests || '-',
      body.urgency,
      body.referral || '-',
      'Waitlist', // Status
    ];

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Waitlist!A:J', // Sheet name and range (updated to J for occupation)
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Added to waitlist successfully',
    });
  } catch (error: any) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit' },
      { status: 500 }
    );
  }
}