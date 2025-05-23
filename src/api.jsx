const API_KEY = "2230781f66c231db978715c2fb4e9325";

export const loadMovieList = (category, page) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${category}?&page=${page}&api_key=${API_KEY}`
  )
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((data) => {
      return data;
    });
};

export const loadMovieDetail = (movieId) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  )
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((data) => {
      return data;
    });
};
