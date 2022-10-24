// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const history = require('connect-history-api-fallback');

// Improts
const { createServer } = require("https");

// Initialise express
const app = express();

// Enable history API fallback
app.use(history({
    verbose: true
  }));
// Create the https server with the certificate
const httpServer = createServer({
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.cert"),
}, app);

// Serve static files
app.use('/', express.static(path.join(__dirname, 'dist')));

// Also serve assets
app.use(express.static(path.join(__dirname, './dist')));

// Listen of 443
httpServer.listen(443);