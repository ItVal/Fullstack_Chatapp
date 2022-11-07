const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const PORT = 2022;

app.use(cors()); // Add cors middleware

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello world');
  });

server.listen(2022, () => console.log("Server is running on port" + PORT));