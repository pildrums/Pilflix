import { getSearch, IGetSearch } from "API/SearchAPI";
import Loader from "Components/Loader";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import {
  PathMatch,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";

interface ISearchForm {
  searchKeyword: string;
}

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetSearch>(["search", keyword], () =>
    getSearch(String(keyword)),
  );
  const onValid = (data: ISearchForm) => {
    navigate(`/search?keyword=${data.searchKeyword}`);
  };
  const searchMatch: PathMatch<string> | null =
    useMatch(`search/:menuName/:id`);
  return (
    <Wrapper>
      <Helmet>
        <title>검색 - Pilflix</title>
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
                >
                  {movie.poster_path ? (
                    <img src={makeImagePath(movie.poster_path)} alt="" />
                  ) : (
                    <span>이미지가 없습니다.</span>
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
                >
                  {series.poster_path ? (
                    <img src={makeImagePath(series.poster_path)} alt="" />
                  ) : (
                    <span>이미지가 없습니다.</span>
                  )}
                </SeriesItem>
              ))}
            </SeriesList>
          </SeriesResult>
        </>
      )}
    </Wrapper>
  );
}

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

const Wrapper = styled.div`
  background: #000;
`;

const Space = styled.div`
  margin-top: 150px;
`;

const MovieResult = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  gap: 20px;
`;

const MovieResultTitle = styled.h1`
  border-bottom: 2px solid #fff;
  font-size: 24px;
  line-height: 80px;
  span {
    font-weight: 400;
  }
`;

const MovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const MovieItem = styled(motion.li)`
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.white.darker};
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  img {
    width: 100%;
  }
  &:nth-child(4n) {
    transform-origin: center right;
  }
  &:nth-child(4n + 1) {
    transform-origin: center left;
  }
`;

const SeriesResult = styled(MovieResult)``;

const SeriesResultTitle = styled(MovieResultTitle)``;

const SeriesList = styled(MovieList)``;

const SeriesItem = styled(MovieItem)``;

export default memo(Search);
