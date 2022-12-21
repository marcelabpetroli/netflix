// login

const getMoviesFromApi = (params) => {
  console.log(params);
  console.log('Se están pidiendo las películas de la app');
  const queryGender = params.gender.toLowerCase();
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(`//localhost:4000/movies?gender=${queryGender}`, { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
