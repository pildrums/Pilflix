import MovieSearch from "Components/Movie/MovieSearch";
import SeriesSearch from "Components/Series/SeriesSearch";
import { memo } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

function Search() {
  return (
    <Wrapper>
      <Helmet>
        <title>검색 - Pilflix</title>
      </Helmet>
      <Space />
      <MovieSearch />
      <SeriesSearch />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #000;
`;

const Space = styled.div`
  margin-top: 200px;
`;

export default memo(Search);
