import MovieSearch from "Components/Movie/MovieSearch";
import SeriesSearch from "Components/Series/SeriesSearch";
import styled from "styled-components";

function Search() {
  return (
    <Wrapper>
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
  margin-top: 100px;
`;

export default Search;
