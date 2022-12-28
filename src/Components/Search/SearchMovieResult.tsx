import { IGetSearch } from "API/SearchAPI";
import MovieDetail from "Components/Movie/MovieDetail";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";

interface ISearchMovieResultProps {
  keyword: string | (string | null)[] | null;
  id: string | (string | null)[] | null;
  data: IGetSearch | undefined;
}

function SearchMovieResult({ keyword, data, id }: ISearchMovieResultProps) {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const onBoxClicked = (movieId: number, type: string) => {
    setType(type);
    navigate(`/search?keyword=${keyword}&type=${type}&id=${movieId}`);
  };
  return (
    <>
      <Space />
      <MovieResult>
        <MovieResultTitle>
          영화 검색결과 - <span>{keyword}</span>
        </MovieResultTitle>
        <MovieList>
          {data?.search_movies.results.map((movie) => (
            <>
              <MovieItem
                key={movie.id}
                variants={itemVars}
                initial="normal"
                whileHover="hover"
                poster={makeImagePath(movie.poster_path)}
              >
                <MovieInfo variants={infoVars}>
                  <h4>{movie.title}</h4>
                </MovieInfo>
              </MovieItem>
              <AnimatePresence>
                <Overlay />
                <MovieDetail
                  movieId={Number(id)}
                  rowIndex={type}
                  search={String(keyword)}
                />
              </AnimatePresence>
            </>
          ))}
        </MovieList>
      </MovieResult>
    </>
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

export default SearchMovieResult;
