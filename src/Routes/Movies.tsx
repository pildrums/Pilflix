import { getMovies, IGetMovies } from "API/movieAPI";
import Loader from "Components/Loader";
import MovieBanner from "Components/Movie/MovieBanner";
import MovieCarousel from "Components/Movie/MovieCarousel";
import MovieDetail from "Components/Movie/MovieDetail";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const carouselTitle = {
  nowPlaying: "현재 상영 중인 영화",
  popular: "가장 인기있는 영화",
  upComing: "개봉 예정 영화",
};

const MOVIES = "movies";
const NOWPLAYING = 0;
const POPULAR = 1;
const UPCOMING = 2;

function Movies() {
  const navigate = useNavigate();
  const movieMatch = useMatch(`/${MOVIES}/:movieId`);
  const { data, isLoading } = useQuery<IGetMovies>(["movies"], getMovies);
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const onBoxClicked = (movieId: number) => {
    setRowIndex(rowIndex);
    navigate(`/movies/${movieId}`);
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieBanner data={data} />
          <MovieCarousel
            data={data?.playing_movie}
            carouselTitle={carouselTitle.nowPlaying}
            onBoxClicked={onBoxClicked}
            rowIndex={NOWPLAYING}
          />
          <MovieCarousel
            data={data?.popular_movie}
            carouselTitle={carouselTitle.popular}
            onBoxClicked={onBoxClicked}
            rowIndex={POPULAR}
          />
          <MovieCarousel
            data={data?.upComing_movie}
            carouselTitle={carouselTitle.upComing}
            onBoxClicked={onBoxClicked}
            rowIndex={UPCOMING}
          />
          <AnimatePresence>
            {movieMatch ? (
              <MovieDetail
                movieMatch={movieMatch}
                movieId={Number(movieMatch.params.movieId)}
                index={rowIndex}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #000;
`;

export default Movies;
