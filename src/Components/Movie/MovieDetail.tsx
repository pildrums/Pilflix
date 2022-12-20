import { getMovie, IGetMovie } from "API/movieAPI";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { PathMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";

interface IMovieDetailProps {
  movieMatch: PathMatch<"movieId"> | null;
  movieId: number;
  rowIndex?: number | string | null;
}

function MovieDetail({ movieMatch, movieId, rowIndex }: IMovieDetailProps) {
  const navigate = useNavigate();
  const { data } = useQuery<IGetMovie>(["movie", movieId], () =>
    getMovie(movieId),
  );
  const onOverlayClick = () => {
    navigate("/");
  };
  return (
    <>
      {movieMatch ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <Card
            variants={modalVariants}
            layoutId={String((rowIndex + "_" || "") + movieId)}
            initial="initial"
            animate="click"
            exit="exit"
          >
            <CardCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  String(data?.movie_detail.backdrop_path),
                )})`,
              }}
            />
            <CardTitle>{data?.movie_detail.title}</CardTitle>
            <CardOverview>{data?.movie_detail.overview}</CardOverview>
          </Card>
        </>
      ) : null}
    </>
  );
}

const modalVariants = {
  initial: { opacity: 0 },
  click: { opacity: 1 },
  exit: { opacity: 0 },
};

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
  background: ${(props) => props.theme.black.lighter};
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const CardCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const CardTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 32px;
  position: relative;
  top: -80px;
`;

const CardOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

export default MovieDetail;
