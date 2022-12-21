// login

const getMoviesFromApi = (params) => {
  const queryParams = `gender=${params.gender.toLowerCase()}&sort=${params.sort}`;

  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('//localhost:4000/movies?' + queryParams, { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
