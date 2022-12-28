const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const { response } = require('express');

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

// function to capitalize 1st letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//End points
server.get('/movies', (req, res) => {
  const genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort.toUpperCase();

  if (genreFilterParam !== '') {
    const queryGenre = db.prepare(
      `SELECT * FROM movies WHERE genre = ? ORDER BY name ${sortFilterParam}`
    );
    const moviesByGenre = queryGenre.all(
      capitalizeFirstLetter(genreFilterParam)
    );
    const response = {
      success: true,
      movies: moviesByGenre,
    };
    res.json(response);
  } else {
    const querySort = db.prepare(
      `SELECT * FROM movies ORDER BY name ${sortFilterParam}`
    );
    const moviesSorted = querySort.all();
    const response = {
      success: true,
      movies: moviesSorted,
    };
    res.json(response);
  }
});

server.get('/movie/:movieId', (req, res) => {
  const movieId = req.params.movieId;

  const query = db.prepare(`SELECT * FROM movies WHERE id = ?`);
  const result = query.get(movieId);
  res.render('movie', result);
});

server.post('/login', (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const queryUser = db.prepare(
    'SELECT * FROM users WHERE email = ? AND password = ?'
  );
  const result = queryUser.get(userEmail, userPassword);

  if (result !== undefined) {
    const responseSuccess = {
      success: true,
      userId: result.id,
    };
    res.json(responseSuccess);
  } else {
    const responseError = {
      success: false,
      errorMessage: 'Usuaria/o no encontrada/o',
    };
    res.json(responseError);
  }
});

server.post('/sign-up', (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const queryIsUser = db.prepare(
    'SELECT * FROM users WHERE email = ? AND password = ?'
  );
  const isUser = queryIsUser.get(userEmail, userPassword);

  if (isUser === undefined) {
    const queryNewUser = db.prepare(
      'INSERT INTO users (email, password) VALUES (?, ?)'
    );
    const result = queryNewUser.run(userEmail, userPassword);
    res.json({
      success: true,
      userId: result.lastInsertRowid,
    });
  } else {
    res.json({
      success: false,
      errorMessage: 'Usuaria ya existente',
    });
  }
});

server.post('/user/profile', (req, res) => {
  const userObject = req.body;
  const userId = req.headers['user-id'];

  const query = db.prepare(
    'UPDATE users SET name=?, email=?, password=? WHERE id=?'
  );
  const result = query.run(
    userObject.name,
    userObject.email,
    userObject.password,
    userId
  );

  res.json({
    success: true,
  });
});

server.get('/user/profile', (req, res) => {
  const userId = req.headers['user-id'];

  const query = db.prepare('SELECT * FROM users WHERE id=?');
  const result = query.get(userId);

  res.json(result);
});

//Servidores estáticos
const staticServer = './src/public-react';
server.use(express.static(staticServer));

const staticServerImages = './src/public-movies-images';
server.use(express.static(staticServerImages));

const staticServerStyles = './src/public-css';
server.use(express.static(staticServerStyles));
