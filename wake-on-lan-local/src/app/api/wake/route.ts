import { NextRequest, NextResponse } from 'next/server';
import { pc_map } from './data';

// Import wakeonlan
const wol = require('wakeonlan');

export async function GET(request: NextRequest) {
  // Get pc to wake from request parameters
  const pc = request.nextUrl.searchParams.get('pc');

  // Check if the pc parameter is provided
  if (!pc) {
    return NextResponse.json({ message: 'Invalid PC' }, { status: 400 });
  }

  // If pc parameter provded is 'all', wake all defined pcs
  if (pc === 'all') {
    if (wakeAll() === false) {
      return NextResponse.json({ message: 'Failed to wake all PCs' }, { status: 500 });
    }

    // Add all pc names from data.ts to an array
    const waking = pc_map.pcs.map((pc) => pc.name);

    // Respond with a list of PCs being woken
    return NextResponse.json(
      {
        message: 'Waking PCs',
        pcs: waking
      }
    );
  }

  // Otherwise, try to wake a single PC
  if (wakePC(pc) === false) {
    return NextResponse.json({ message: `Failed to wake ${pc}` }, { status: 500 });
  }

  // Construct response
  return NextResponse.json({ message: `Waking up ${pc}` });
}

// wakeAll should return a string array of awoken PCs
const wakeAll = () => {
  try {
    pc_map.pcs.forEach((pc) => {
      wol(pc.mac).then(() => {
        console.log(`Attempting to wake PC: ${pc.name}`);
      });
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const wakePC = (pc: string) => {
  try {
    // Get the mac address of the pc
    const mac = pc_map.pcs.find((element) => element.name === pc)?.mac;

    // Check to see if the pc exists
    if (!mac) {
      throw new Error(`PC: ${pc} not found`);
    }

    // Wake the pc
    wol(mac).then(() => {
      console.log(`Attempting to wake PC: ${pc}`);
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
