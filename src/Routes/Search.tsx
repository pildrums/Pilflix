import { getSearch, IGetSearch } from "API/SearchAPI";
import Loader from "Components/Loader";
import SearchDetail from "Components/Search/SearchDetail";
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

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetSearch>(["search", keyword], () =>
    getSearch(String(keyword)),
  );
  const searchMatch: PathMatch<string> | null = useMatch(
    `search/:menuName/:searchId`,
  );
  const onOverlayCilck = () => {
    navigate(`/search?keyword=${keyword}`);
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
          <SearchResult>
            <SearchResultTitle>
              영화 검색결과 - <span>{keyword}</span>
            </SearchResultTitle>
            <SearchList>
              {data?.search_movies.results.map((movie) => (
                <>
                  {movie.poster_path ? (
                    <SearchItem
                      key={movie.id}
                      variants={itemVars}
                      initial="normal"
                      whileHover="hover"
                      poster={makeImagePath(movie.poster_path)}
                    >
                      <SearchInfo variants={infoVars}>
                        <h4>{movie.title}</h4>
                      </SearchInfo>
                    </SearchItem>
                  ) : (
                    <SearchItem
                      key={movie.id}
                      variants={itemVars}
                      initial="normal"
                      whileHover="hover"
                      poster={makeImagePath(movie.poster_path)}
                    >
                      <span>이미지가 없습니다.</span>
                      <SearchInfo variants={infoVars}>
                        <h4>{movie.title}</h4>
                      </SearchInfo>
                    </SearchItem>
                  )}
                </>
              ))}
            </SearchList>
          </SearchResult>
          <Space />
          <SearchResult>
            <SearchResultTitle>
              시리즈 검색결과 - <span>{keyword}</span>
            </SearchResultTitle>
            <SearchList>
              {data?.search_series.results.map((series) => (
                <>
                  {series.poster_path ? (
                    <SearchItem
                      key={series.id}
                      variants={itemVars}
                      initial="normal"
                      whileHover="hover"
                      poster={makeImagePath(series.poster_path)}
                    >
                      <SearchInfo variants={infoVars}>
                        <h4>{series.name}</h4>
                      </SearchInfo>
                    </SearchItem>
                  ) : (
                    <SearchItem
                      key={series.id}
                      variants={itemVars}
                      initial="normal"
                      whileHover="hover"
                      poster={makeImagePath(series.poster_path)}
                    >
                      <span>이미지가 없습니다.</span>
                      <SearchInfo variants={infoVars}>
                        <h4>{series.name}</h4>
                      </SearchInfo>
                    </SearchItem>
                  )}
                </>
              ))}
            </SearchList>
          </SearchResult>
          <Space />
          <AnimatePresence>
            {searchMatch ? <SearchDetail searchMatch={searchMatch} /> : null}
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

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  gap: 20px;
`;

const SearchResultTitle = styled.h1`
  border-bottom: 1px solid #fff;
  font-size: 24px;
  line-height: 80px;
  span {
    font-weight: 400;
  }
`;

const SearchList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const SearchItem = styled(motion.li)<{ poster: string }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.black.veryDark};
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

const SearchInfo = styled(motion.div)`
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

export default memo(Search);
