// import jwt from 'jsonwebtoken';
// import { NextResponse } from 'next/server';

// export async function verifyAuth(request) {
//   const authHeader = request.headers.get('authorization');

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     // If verification is successful, return null to proceed
//     return null;
//   } catch (err) {
//     return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
//   }
// }