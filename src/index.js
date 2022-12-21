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
  const sortFilterParam = req.query.sort;

  function compare(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }

  // const sortedMoviesAsc = moviesData.sort(compare);

  // const sortedMoviesDesc = moviesData.reverse();

  const filteredMoviesByGender = moviesData.filter((movies) => movies.gender.toLowerCase() === genderFilterParam);

  if (genderFilterParam === '') {
    res.json({
      success: true,
      movies: sortFilterParam === 'asc' ? moviesData.sort(compare) : moviesData.reverse(compare),
    });
  } else {
    res.json({
      success: true,
      movies: sortFilterParam === 'asc' ? filteredMoviesByGender.sort(compare) : filteredMoviesByGender.reverse(compare),
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
