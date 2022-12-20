import { getMovie, IGetMovie } from "API/movieAPI";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { PathMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IMovieDetailProps {
  movieMatch: PathMatch<"movieId"> | null;
  movieId: number;
  index: number | null;
}

function MovieDetail({ movieMatch, movieId, index }: IMovieDetailProps) {
  const navigate = useNavigate();
  const { data } = useQuery<IGetMovie>(["movie", movieId], () =>
    getMovie(movieId),
  );
  const onOverlayClick = () => {
    navigate("/");
  };
  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <Card layoutId={String((index + "_" || "") + movieId)}>
        <h2>{data?.movie_detail.title}</h2>
      </Card>
    </>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Card = styled(motion.div)`
  width: 40vw;
  height: 80vh;
  background: coral;
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export default MovieDetail;
