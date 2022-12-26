import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = process.env.REACT_APP_BASE_URL;

interface IMovie {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetMovies {
  playing_movie: IGetMoviesResult;
  popular_movie: IGetMoviesResult;
  upComing_movie: IGetMoviesResult;
}

interface IMovieGenres {
  id: number;
  name: string;
}

interface IMovieDetail {
  backdrop_path: string;
  poster_path: string;
  genres: IMovieGenres[];
  id: number;
  title?: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date?: string;
  runtime?: number;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetMovie {
  movie_detail: IMovieDetail;
}

export async function getMovies() {
  const movies = {} as IGetMovies;
  const playingMovie = await axios.get(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`,
  );
  movies.playing_movie = playingMovie.data;
  const popularMovie = await axios.get(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`,
  );
  movies.popular_movie = popularMovie.data;
  const upComingMovie = await axios.get(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`,
  );
  movies.upComing_movie = upComingMovie.data;

  return movies;
}

export async function getMovie(id: number) {
  const movie = {} as IGetMovie;
  const movie_detail = await axios.get(
    `${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=ko-KR`,
  );
  movie.movie_detail = movie_detail.data;

  return movie;
}
