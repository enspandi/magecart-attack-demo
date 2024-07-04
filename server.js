const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const WebSocket = require('ws');
const port = 3020;


// Configure CORS options
const corsOptions = {
  origin: 'http://foo.ticketsolvedev.com:3000',
  optionsSuccessStatus: 200
};

// Middleware to enable CORS
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve the tracker.js file
app.use(express.static('public'));

// API endpoint to receive data
app.post('/api/data', (req, res) => {
  const data = req.body;
  console.log(data);
  res.sendStatus(200);
});

const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established.');

  // Send a message to the client
  ws.send(JSON.stringify({ message: 'Hello from the server!' }));

  // Handle messages from the client
  ws.on('message', (message) => {
      console.log('Received:', message);
      // Echo the message back to the client
      ws.send(`Server received: ${message}`);
  });

  // Handle connection close
  ws.on('close', () => {
      console.log('WebSocket connection closed.');
  });
});


// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});