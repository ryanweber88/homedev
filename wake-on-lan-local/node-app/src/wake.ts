import { PC } from './types';
import { pc_map } from './example-data';

const wol = require('wakeonlan');

export function wakeAll(): string[] {
  try {
    console.log('Attempting to wake PCs: ', pc_map.pcs.map((pc: PC) => pc.name));
    pc_map.pcs.forEach((pc: PC) => {
      wol(pc.mac)
        .catch((error: Error) => {
          console.error(`Failed to wake PC: ${pc.name}`, error);
        });
    });

    return pc_map.pcs.map((pc: PC) => pc.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function wakePC(pc: string): boolean {
  try {
    // Get the mac address of the pc
    const mac = pc_map.pcs.find((element: PC) => element.name === pc)?.mac;

    // Check to see if the pc exists
    if (!mac) {
      throw new Error(`PC: ${pc} not found`);
    }

    // Wake the pc
    wol(mac)
      .then(() => {
        console.log(`Attempting to wake PC: ${pc}`);
      })
      .catch((error: Error) => {
        console.error(`Failed to wake PC: ${pc}`, error);
      });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}