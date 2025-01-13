import { NextRequest, NextResponse } from 'next/server';
import { pc_map } from './data';

// Import wakeonlan
const wol = require('wakeonlan');

export async function GET(request: NextRequest) {
  // Get pc to wake from request parameters
  const pc = request.nextUrl.searchParams.get('pc');

  // Get the mac address of the pc
  const mac = pc_map.pcs.find((element) => element.name === pc)?.mac;

  // Check to see if the pc exists
  if (!mac) {
    return NextResponse.json({ message: `PC ${pc} not found` }, { status: 404 });
  }

  // Wake the pc
  wol(mac, (error: Error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Waking up ${pc}`);
    }
  })

  // Construct response
  return NextResponse.json({ message: `Waking up ${pc}` });
}
