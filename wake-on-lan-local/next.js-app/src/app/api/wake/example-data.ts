// NOTE: THIS IS AN EXAMPLE
// Please copy this a file named 'data.ts' in /src/app/api/wake
// and configure it with details of the PCs on your local network

import { PCMap } from "../types"

// Retrieve the mac addresses of the PCs you'd like to be able to access,
// name them, and add them to the pc_map object
export const pc_map: PCMap = {
  pcs: [
    {
      name: "DESKTOP-NAME-HERE", // Doesn't have to match the naem of the PC
      mac: "00:00:00:00:00:00" // MAC address of the NIC on the PC that has WOL enabled
    }
  ]
}
