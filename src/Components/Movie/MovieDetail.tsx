import { motion } from "framer-motion";
import { PathMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IMovieDetailProps {
  movieMatch: PathMatch<"movieId"> | null;
}

function MovieDetail({ movieMatch }: IMovieDetailProps) {
  const navigate = useNavigate();
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
      <motion.div
        layoutId={movieMatch?.params.movieId}
        style={{
          position: "absolute",
          width: "40vw",
          height: "80vh",
          background: "coral",
          top: 50,
          left: 0,
          right: 0,
          margin: "0 auto",
        }}
      />
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

export default MovieDetail;
