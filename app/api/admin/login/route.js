// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// // The function MUST be named POST and it MUST be exported.
// export async function POST(request) {
//   try {
//     const { username, password } = await request.json();
    
//     const expectedUsername = process.env.ADMIN_USERNAME;
//     const expectedPassword = process.env.ADMIN_PASSWORD;

//     if (username === expectedUsername && password === expectedPassword) {
//       const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
//       return NextResponse.json({ token });
//     } else {
//       return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//     }
//   } catch (error) {
//     console.error("Login API Error:", error);
//     return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
//   }
// }