import { getSearch, IGetSearch } from "API/SearchAPI";
import Loader from "Components/Loader";
import SeriesDetail from "Components/Series/SeriesDetail";
import { AnimatePresence, motion } from "framer-motion";
import queryString from "query-string";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";
import SearchMovieDetail from "Components/Search/SearchMovieDetail";
import SearchSeriesDetail from "Components/Search/SearchSeriesDetail";

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const { keyword, id } = queryString.parse(location.search);
  const [type, setType] = useState("");
  const { data, isLoading } = useQuery<IGetSearch>(["search", keyword], () =>
    getSearch(String(keyword)),
  );
  const onBoxClicked = (programId: number, type: string) => {
    setType(type);
    navigate(`/search?keyword=${keyword}&type=${type}&id=${programId}`);
  };
  return (
    <Wrapper>
      <Helmet>
        <title>{keyword}: 검색결과 - Pilflix</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Space />
          <MovieResult>
            <MovieResultTitle>
              영화 검색결과 - <span>{keyword}</span>
            </MovieResultTitle>
            <MovieList>
              {data?.search_movies.results.map((movie) => (
                <MovieItem
                  key={movie.id}
                  variants={itemVars}
                  initial="normal"
                  whileHover="hover"
                  poster={makeImagePath(movie.poster_path)}
                  onClick={() => onBoxClicked(movie.id, "movie")}
                >
                  {movie.poster_path ? (
                    <MovieInfo variants={infoVars}>
                      <h4>{movie.title}</h4>
                    </MovieInfo>
                  ) : (
                    <MovieInfo variants={infoVars}>
                      <span>이미지가 없습니다.</span>
                      <h4>{movie.title}</h4>
                    </MovieInfo>
                  )}
                </MovieItem>
              ))}
            </MovieList>
          </MovieResult>
          <Space />
          <SeriesResult>
            <SeriesResultTitle>
              시리즈 검색결과 - <span>{keyword}</span>
            </SeriesResultTitle>
            <SeriesList>
              {data?.search_series.results.map((series) => (
                <SeriesItem
                  key={series.id}
                  variants={itemVars}
                  initial="normal"
                  whileHover="hover"
                  poster={makeImagePath(series.poster_path)}
                  onClick={() => onBoxClicked(series.id, "series")}
                >
                  {series.poster_path ? (
                    <SeriesInfo variants={infoVars}>
                      <h4>{series.name}</h4>
                    </SeriesInfo>
                  ) : (
                    <SeriesInfo variants={infoVars}>
                      <span>이미지가 없습니다.</span>
                      <h4>{series.name}</h4>
                    </SeriesInfo>
                  )}
                </SeriesItem>
              ))}
            </SeriesList>
          </SeriesResult>
          <Space />
          <AnimatePresence>
            {!id ? null : type === "movie" ? (
              <>
                <SearchMovieDetail
                  movieId={Number(id)}
                  rowIndex={type}
                  search={String(keyword)}
                />
              </>
            ) : type === "series" ? (
              <>
                <SearchSeriesDetail
                  seriesId={Number(id)}
                  rowIndex={type}
                  search={String(keyword)}
                />
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

const detailVariants = {
  initial: { opacity: 0 },
  click: { opacity: 1 },
  exit: { opacity: 0 },
};

const itemVars = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const Wrapper = styled.div`
  background: #000;
  position: relative;
  @media all and (min-width: 1024px) {
    width: 768px;
    margin: 0 auto;
  }
`;

const Space = styled.div`
  margin-top: 150px;
`;

const MovieResult = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 60px;
  gap: 20px;
`;

const MovieResultTitle = styled.h1`
  border-bottom: 1px solid #fff;
  font-size: 24px;
  line-height: 80px;
  span {
    font-weight: 400;
  }
`;

const MovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const MovieItem = styled(motion.li)<{ poster: string }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.black.veryDark};
  background-image: url(${(props) => props.poster});
  background-size: cover;
  height: 250px;
  border-radius: 8px;
  span {
    position: absolute;
  }
  &:nth-child(4n) {
    transform-origin: center right;
  }
  &:nth-child(4n + 1) {
    transform-origin: center left;
  }
`;

const MovieInfo = styled(motion.div)`
  padding: 20px 10px;
  background: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: relative;
  width: 100%;
  top: 42%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 8px 8px;
  h4 {
    text-align: center;
    font-size: 14px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
`;

const SeriesResult = styled(MovieResult)``;
const SeriesResultTitle = styled(MovieResultTitle)``;
const SeriesList = styled(MovieList)``;
const SeriesItem = styled(MovieItem)``;
const SeriesInfo = styled(MovieInfo)``;

export default Search;
