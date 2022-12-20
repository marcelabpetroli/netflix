const express = require('express');
const cors = require('cors');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;

server.get('/movies', (req, res) => {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  console.log(req);
  res.json({ message: 'ha sido un exito' });
});

server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
