import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = process.env.REACT_APP_BASE_URL;

interface ISeries {
  backdrop_path: string;
  id: number;
  name?: string;
  vote_average: number;
  first_air_date: string;
  overview: string;
  poster_path: string;
}

export interface IGetSeriesResult {
  page: number;
  results: ISeries[];
  total_pages: number;
  total_results: number;
}

export interface IGetSeries {
  popular_series: IGetSeriesResult;
  onTheAir_series: IGetSeriesResult;
  topLated_series: IGetSeriesResult;
}

interface ISeriesGenres {
  id: number;
  name: string;
}

export interface ISeriesDetail {
  backdrop_path: string;
  poster_path: string;
  name: string;
  original_name: string;
  overview: string;
  vote_average: number;
  id: number;
  genres: ISeriesGenres[];
}

export interface IGetSeriesDetail {
  series_detail: ISeriesDetail;
}

export async function getSeries() {
  const series = {} as IGetSeries;
  const popularSeries = await axios.get(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR&page=1`,
  );
  series.popular_series = popularSeries.data;
  const onTheAirSeries = await axios.get(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR&page=1`,
  );
  series.onTheAir_series = onTheAirSeries.data;
  const topLatedSeries = await axios.get(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`,
  );
  series.topLated_series = topLatedSeries.data;

  return series;
}

export async function getSeriesDetail(id: number) {
  const series = {} as IGetSeriesDetail;
  const series_detail = await axios.get(
    `${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=ko`,
  );
  series.series_detail = series_detail.data;

  return series;
}
