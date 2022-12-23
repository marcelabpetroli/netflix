const express = require('express');
const cors = require('cors');
// const moviesData = require('./data/movies.json');
const Database = require('better-sqlite3');

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

// init and config data base
const db = new Database('./src/database.db', {
  // comment next line to hide data base logs in console
  verbose: console.log,
});

//End points
server.get('/movies', (req, res) => {
  const genderFilterParam = req.query.gender;
  const sortFilterParam = req.query.sort;

  const queryGenderAsc = db.prepare('SELECT * FROM movies WHERE gender = ? AND ORDER BY name ASC');
  const moviesGenderAsc = query.all(genderFilterParam);

  const queryGenderDesc = db.prepare('SELECT * FROM movies WHERE gender = ? AND ORDER BY name DESC');
  const moviesGenderDesc = query.all(genderFilterParam);

  const querySortAsc = db.prepare('SELECT * FROM movies ORDER BY name ASC');
  const moviesSortAsc = query.all();

  const querySortDesc = db.prepare('SELECT * FROM movies ORDER BY name DESC');
  const moviesSortDesc = query.all();

  if (genderFilterParam === '') {
    res.json({
      success: true,
      movies: sortFilterParam === 'asc' ? moviesSortAsc : moviesSortDesc,
    });
  } else {
    res.json({
      success: true,
      movies: sortFilterParam === 'asc' ? moviesGenderAsc : moviesGenderDesc,
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
