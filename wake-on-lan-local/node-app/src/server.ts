import express, { Request, Response } from 'express';
import * as wake from './wake';
import os from 'os';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

// Endpoint to wake up a device using its name
app.get('/wake/:pc', async (req: Request, res: Response) => {
  const { pc } = req.params;

  if (!pc) {
    return res.status(400).json({ error: 'PC name is required.' });
  }

  if (pc === 'all') {
    try {
      const names = wake.wakeAll();
      return res.json({ message: 'Wake-on-LAN packets sent to all PCs.', pcs: names });
    } catch (error) {
      console.error('Error sending Wake-on-LAN packets:', error);
      return res.status(500).json({ error: 'Failed to send Wake-on-LAN packets to all PCs.' });
    }
  }

  try {
    const success = wake.wakePC(pc);
    if (success) {
      res.json({ message: `Wake-on-LAN packet sent to ${pc}` });
    } else {
      res.status(404).json({ error: `PC with name "${pc}" not found.` });
    }
  } catch (error) {
    console.error('Error sending Wake-on-LAN packet:', error);
    res.status(500).json({ error: 'Failed to send Wake-on-LAN packet.' });
  }
});

// Get the machine's DHCP address
function getLocalIpAddress(): string {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    if (iface) {
      for (const alias of iface) {
        if (alias.family === 'IPv4' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }
  return 'Unknown';
}

// Start the server
app.listen(port, () => {
  const ipAddress = getLocalIpAddress();
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Server DHCP address: http://${ipAddress}:${port}`);
});
