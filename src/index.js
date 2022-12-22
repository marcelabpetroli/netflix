const express = require('express');
const cors = require('cors');
const moviesData = require('./data/movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//Instalación del motor de plantillas
server.set('view engine', 'ejs');

//End points
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
  const filteredMoviesByGender = moviesData.filter(
    (movie) => movie.gender.toLowerCase() === genderFilterParam
  );
  if (genderFilterParam === '') {
    res.json({
      success: true,
      movies:
        sortFilterParam === 'asc'
          ? moviesData.sort(compare)
          : moviesData.reverse(compare),
    });
  } else {
    res.json({
      success: true,
      movies:
        sortFilterParam === 'asc'
          ? filteredMoviesByGender.sort(compare)
          : filteredMoviesByGender.reverse(compare),
    });
  }
});

server.get('/movie/:movieId', (req, res) => {
  const urlMovieId = req.params.movieId;
  const foundMovie = moviesData.find((movie) => movie.id === urlMovieId);
  res.render('movie', foundMovie);
});

//Servidores estáticos
const staticServer = './src/public-react';
server.use(express.static(staticServer));

const staticServerImages = './src/public-movies-images';
server.use(express.static(staticServerImages));

const staticServerStyles = './src/public-css';
server.use(express.static(staticServerStyles));
