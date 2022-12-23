import axios from "axios";
import { IGetMoviesResult } from "./movieAPI";
import { IGetSeriesResult } from "./SeriesAPI";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = process.env.REACT_APP_BASE_URL;

export interface IGetSearch {
  search_movies: IGetMoviesResult;
  search_series: IGetSeriesResult;
}

export async function getSearch(text: string | null) {
  const search = {} as IGetSearch;
  const searchMovies = await axios.get(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${text}&page=1&include_adult=false&region=kr`,
  );
  search.search_movies = searchMovies.data;

  const searchSeries = await axios.get(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${text}&page=1&include_adult=false&region=kr`,
  );
  search.search_series = searchSeries.data;

  return search;
}
