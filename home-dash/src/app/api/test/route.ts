import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Start by integrating with and retriving finance information from creditkarma
  return NextResponse.json({ message: "Hello World - This is a test!" });
}
