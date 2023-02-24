// I create functions to create elements and select existing ones
/* EXPORT THIS ----> */ const cE = (type) => document.createElement(type);
/* EXPORT THIS ----> */ const qS = (element) => document.querySelector(element);
/* EXPORT THIS ----> */ const qSA = (element) =>
  document.querySelectorAll(element);
/* EXPORT THIS ----> */ const bodyEl = document.body;

// Here I concatenate the two constants to create the API KEY ID string: henceforth API_KEY
const PRE_API_KEY = "?api_key=";
const API_KEY_ID = "6df0175461882f84933b5dc354d7e3e4";
const APY_KEY = PRE_API_KEY + API_KEY_ID; // APY_KEY must be inserted in the third position after the BASE_URL

// Here I create my url for requests to TMDB
const BASE_URL = "https://api.themoviedb.org/3/discover/movie/";
const BASE_URL_MOVIE = "https://api.themoviedb.org/3/movie/";
let endPoint; // Choose between "now_playing/popular/top_rated/upcoming"
const STRING_LANGUAGE = "&language=it-IT";
// So Ex. of fetch: BASE_URL + END_POINT + API_KEY + STRING_LANGUAGE

// the BASE_IMG_URL is useful to concatenate the poster_path and thus obtain the actual link to the covers of our films
const BASE_IMG_URL = "https://image.tmdb.org/t/p/original"; // + [poster_path]

// IN fromAge and toAge insert only the year
const TIME_BAND = (fromAge, toAge) => {
  let fromToAges = `&primary_release_date.gte=${fromAge}&primary_release_date.lte=${toAge}`;
  return fromToAges;
};

const AGES_60 = TIME_BAND(1960, 1969);
const AGES_70 = TIME_BAND(1970, 1979);
const AGES_80 = TIME_BAND(1980, 1989);
const AGES_90 = TIME_BAND(1990, 1999);
const AGES_60_90 = TIME_BAND(1960, 1999);

/* EXPORT THIS ----> */ const AGES = [AGES_60, AGES_70, AGES_80, AGES_90];

/* EXPORT THIS ----> */ const GET = async (ages = "") => {
  const res = await fetch(
    BASE_URL + APY_KEY + STRING_LANGUAGE + ages + "&sort_by=vote_count.desc"
  );
  const data = await res.json();
  return data;
};

/* EXPORT THIS ----> */ const GET_FILM = async (id = "") => {
  const res = await fetch(BASE_URL_MOVIE + id + APY_KEY + STRING_LANGUAGE);
  const data = await res.json();
  return data;
};

/* 
AZIONE --- 28
AVVENTURA --- 12
ANIMAZIONE --- 16
FANTASCIENZA --- 878 
TRILLER --- 53
 */

const myGenres = {
  action: `&with_genres=28`,
  adventure: `&with_genres=12`,
  animation: `&with_genres=16`,
  science_f: `&with_genres=878`,
  thriller: `&with_genres=53`,
};

/* EXPORT THIS ----> */ const GET_GENRES = async (genres) => {
  const res = await fetch(
    BASE_URL + APY_KEY + STRING_LANGUAGE + AGES_60_90 + genres
  );
  const data = await res.json();
  return data;
};

export {
  cE,
  qS,
  qSA,
  bodyEl,
  BASE_IMG_URL,
  GET,
  GET_FILM,
  AGES,
  GET_GENRES,
  myGenres,
};
