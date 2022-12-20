import { motion } from "framer-motion";
import { PathMatch } from "react-router-dom";

interface IMovieDetailProps {
  movieMatch: PathMatch<"movieId"> | null;
}

function MovieDetail({ movieMatch }: IMovieDetailProps) {
  return (
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
  );
}

export default MovieDetail;
