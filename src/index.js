const express = require('express');
const cors = require('cors');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;

server.get('/movies', (req, res) => {
  console.log(req);
  // res.json({ message: 'ha sido un exito' });
  //(Mónica)He añadido este objeto a la respuesta del servidor
  res.json({
    success: true,
    movies: [
      {
        id: '1',
        title: 'Gambita de dama',
        gender: 'Drama',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '2',
        title: 'Friends',
        gender: 'Comedia',
        image: 'https://via.placeholder.com/150',
      },
    ],
  });
});

server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
