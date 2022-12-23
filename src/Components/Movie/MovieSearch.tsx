import { motion } from "framer-motion";
import styled from "styled-components";

function MovieSearch() {
  return (
    <Wrapper>
      <SearchTitle>영화 검색결과</SearchTitle>
      <SearchList>
        <SearchItem variants={itemVars} whileHover="hover" exit="exit">
          <SearchImg />
          <SearchItemContent>
            <SearchItemTitle>검색결과</SearchItemTitle>
            <Vote>★ 0.0</Vote>
          </SearchItemContent>
          <Overview>상세 설명</Overview>
        </SearchItem>
        <SearchItem variants={itemVars} whileHover="hover" exit="exit">
          <SearchImg />
          <SearchItemContent>
            <SearchItemTitle>검색결과</SearchItemTitle>
            <Vote>★ 0.0</Vote>
          </SearchItemContent>
          <Overview>상세 설명</Overview>
        </SearchItem>
        <SearchItem variants={itemVars} whileHover="hover" exit="exit">
          <SearchImg />
          <SearchItemContent>
            <SearchItemTitle>검색결과</SearchItemTitle>
            <Vote>★ 0.0</Vote>
          </SearchItemContent>
          <Overview>상세 설명</Overview>
        </SearchItem>
      </SearchList>
    </Wrapper>
  );
}

const itemVars = {
  hover: {
    scale: 1.1,
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
`;

const SearchItem = styled(motion.div)`
  padding: 10px;
  border: 1px solid ${(props) => props.theme.white.darker};
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 40px;
`;

const SearchImg = styled.div`
  width: 200px;
  height: 150px;
  background: coral;
  border-radius: 10px;
`;

const SearchItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SearchItemTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
  user-select: none;
`;

const Vote = styled.div`
  border: 1px solid ${(props) => props.theme.white.darker};
  padding: 8px;
  text-align: center;
  border-radius: 10px;
  user-select: none;
`;

const Overview = styled.p`
  user-select: none;
`;

export default MovieSearch;
