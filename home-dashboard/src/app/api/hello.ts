// 'use server'
// // Import necessary modules for NextRequest and NextResponse
import { NextResponse } from 'next/server';

export default async function handler() {
  return NextResponse.json({ message: 'Hello from Next.js API!' });
}

// // Send a GET response to the client
// export default function GET() {
//   return NextResponse.json({ message: 'Hello from Next.js API!' });
// }