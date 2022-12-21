const express = require('express');
const cors = require('cors');
const moviesData = require('./data/movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;

server.get('/movies', (req, res) => {
  const genderFilterParam = req.query.gender;
  const filteredMoviesByGender = moviesData.filter((movies) => movies.gender.toLowerCase() === genderFilterParam);

  if (genderFilterParam === '') {
    res.json({
      success: true,
      movies: moviesData,
    });
  } else {
    res.json({
      success: true,
      movies: filteredMoviesByGender,
    });
  }
});

server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const staticServer = './src/public-react';
server.use(express.static(staticServer));

const staticServerImages = './src/public-movies-images';
server.use(express.static(staticServerImages));
