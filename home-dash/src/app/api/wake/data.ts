// Define the PCMap object to store the name and mac address of the PCs
interface PCMap {
  pcs: {
    name: string,
    mac: string
  }[]
}

// Retrieve the mac addresses of the PCs you'd like to be able to access,
// name them, and add them to the pc_map object
export const pc_map: PCMap = {
  pcs: [
    {
      name: "PC-NAME-TO-WAKE",
      mac: "00:00:00:00:00:00"
    },
  ]
}
