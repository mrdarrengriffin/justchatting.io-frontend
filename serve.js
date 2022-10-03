// Dependencies
const express = require('express');
const path = require('path');

// Improts
const { createServer } = require("http");

const app = express();

//app.use(cors());

const httpServer = createServer(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
})
app.use(express.static(path.join(__dirname, './dist')));

httpServer.listen(80);