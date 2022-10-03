// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Improts
const { createServer } = require("https");

// Initialise express
const app = express();

// Create the https server with the certificate
const httpServer = createServer({
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.cert"),
}, app);

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
})

// Also serve assets
app.use(express.static(path.join(__dirname, './dist')));

// Listen of 443
httpServer.listen(443);