import {
  getNowMovies,
  getPopularMovies,
  getUpcomingMovies,
} from "API/movieAPI";
import Loader from "Components/Loader";
import MovieBanner from "Components/Movie/MovieBanner";
import MovieCarousel from "Components/Movie/MovieCarousel";
import { useQuery } from "react-query";
import styled from "styled-components";

const carouselTitle = {
  nowPlaying: "현재 상영 중인 영화",
  popular: "가장 인기있는 영화",
  upComing: "개봉 예정 영화",
};

function Movies() {
  const { data: nowData, isLoading: nowLoading } = useQuery(
    ["movies", "nowPlaying"],
    getNowMovies,
  );
  const { data: popularData } = useQuery(
    ["movies", "popular"],
    getPopularMovies,
  );
  const { data: upData } = useQuery(["movies", "upComing"], getUpcomingMovies);
  return (
    <Wrapper>
      {nowLoading ? (
        <Loader />
      ) : (
        <>
          <MovieBanner data={nowData} />
          <MovieCarousel
            data={nowData}
            carouselTitle={carouselTitle.nowPlaying}
          />
          <MovieCarousel
            data={popularData}
            carouselTitle={carouselTitle.popular}
          />
          <MovieCarousel data={upData} carouselTitle={carouselTitle.upComing} />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #000;
`;

export default Movies;
