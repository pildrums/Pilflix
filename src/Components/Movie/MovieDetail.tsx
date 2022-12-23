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
            >
              <CardTitleContainer>
                <CardTitle>{data?.movie_detail.title}</CardTitle>
                <CardVote>
                  ★ {Number(data?.movie_detail.vote_average).toFixed(1)}
                </CardVote>
              </CardTitleContainer>
            </CardCover>
            <CardContent>
              <CardGenres>
                {data?.movie_detail.genres.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </CardGenres>
              <CardOverview>{data?.movie_detail.overview}</CardOverview>
              <CardTimeContainer>
                <Release>개봉일: {data?.movie_detail.release_date}</Release>
                <Runtime>상영 시간: {data?.movie_detail.runtime}분</Runtime>
              </CardTimeContainer>
            </CardContent>
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
  width: 60vw;
  height: 80vh;
  background: ${(props) => props.theme.black.lighter};
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 10px;
`;

const CardCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
`;

const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 0 20px;
  font-size: 32px;
`;

const CardVote = styled.span`
  width: 80px;
  background: transparent;
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.white.lighter};
  border-radius: 10px;
  user-select: none;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardGenres = styled.ul`
  display: flex;
  gap: 10px;
  padding: 20px;
  li {
    border: 2px solid ${(props) => props.theme.white.lighter};
    text-align: center;
    line-height: 40px;
    border-radius: 10px;
    padding: 0 15px;
  }
`;

const CardOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
`;

const CardTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 10px;
`;

const Release = styled.span``;

const Runtime = styled.span``;

export default MovieDetail;
