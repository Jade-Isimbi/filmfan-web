const TMDB_AUTH_URL = "https://www.themoviedb.org/signup";
const TMDB_LOGIN_URL = "https://www.themoviedb.org/login";
const TMDB_REDIRECT_URI = "http://localhost:5173";

export const redirectToTMDB = () => {
  window.location.href = `${TMDB_AUTH_URL}`;
};

export const redirectToTMDBLogin = () => {
  window.location.href = `${TMDB_LOGIN_URL}`;
};
