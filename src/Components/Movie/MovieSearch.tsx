import { getSearch, IGetSearch } from "API/SearchAPI";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { makeImagePath } from "utils";

function MovieSearch() {
  const location = useLocation();
  const { keyword, id } = queryString.parse(location.search);
  const { data, isLoading } = useQuery<IGetSearch>(["search", keyword], () =>
    getSearch(String(keyword)),
  );
  return (
    <Wrapper>
      <SearchTitle>영화 검색결과 - {keyword}</SearchTitle>
      <SearchList>
        {data?.search_movies.results.map((item) => (
          <SearchItem variants={itemVars} whileHover="hover" exit="exit">
            <SearchImg bgphoto={makeImagePath(item.poster_path)} />
            <SearchItemContent>
              <SearchItemTitle>{item.title}</SearchItemTitle>
              <Vote>★ {item.vote_average}</Vote>
            </SearchItemContent>
          </SearchItem>
        ))}
      </SearchList>
    </Wrapper>
  );
}

const itemVars = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    scale: 1,
  },
};

const Wrapper = styled.div`
  padding: 0 60px;
`;

const SearchTitle = styled.h2`
  font-size: 24px;
`;

const SearchList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 40px 0;
`;

const SearchItem = styled(motion.div)`
  padding: 5px;
  border: 1px solid ${(props) => props.theme.white.darker};
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 40px;
`;

const SearchImg = styled.div<{ bgphoto: string }>`
  width: 100px;
  height: 150px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
`;

const SearchItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SearchItemTitle = styled.h2`
  font-size: 16px;
  font-weight: 400;
  user-select: none;
`;

const Vote = styled.div`
  border: 1px solid ${(props) => props.theme.white.darker};
  text-align: center;
  border-radius: 10px;
  user-select: none;
  width: 50px;
  height: 40px;
  line-height: 40px;
`;

export default MovieSearch;
