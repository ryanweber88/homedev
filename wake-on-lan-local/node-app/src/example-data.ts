// Copy this file to a data.ts file in the same directory containing your PC/MAC mappings.
import { PCMap } from "./types"

// Retrieve the mac addresses of the PCs you'd like to be able to access,
// name them, and add them to the pc_map object
export const pc_map: PCMap = {
  pcs: [
    { name: "DESKTOP-NAME", mac: "00:00:00:00:00:00" },
  ],
}
