import { getMovie, IGetMovie } from "API/movieAPI";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { PathMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";
import { MdClose } from "react-icons/md";
import { memo } from "react";

interface IMovieDetailProps {
  movieMatch?: PathMatch<"movieId"> | null;
  movieId: number;
  rowIndex?: number | string | null;
  search?: string;
}

function MovieDetail({
  movieMatch,
  movieId,
  rowIndex,
  search,
}: IMovieDetailProps) {
  const navigate = useNavigate();
  const { data } = useQuery<IGetMovie>(["movie", movieId], () =>
    getMovie(movieId),
  );
  const onOverlayClick = () => {
    search ? navigate(`/search?keyword=${search}`) : navigate("/");
  };
  return (
    <>
      {movieMatch ? (
        <>
          <Overlay
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onOverlayClick}
          />
          <Detail
            variants={detailVariants}
            layoutId={String((rowIndex + "_" || "") + movieId)}
            initial="initial"
            animate="click"
            exit="exit"
          >
            <DetailCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  String(data?.movie_detail.backdrop_path),
                )})`,
              }}
            >
              <CloseButton onClick={onOverlayClick}>
                <MdClose />
              </CloseButton>
            </DetailCover>
          </Detail>
        </>
      ) : null}
    </>
  );
}

const detailVariants = {
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

const Detail = styled(motion.div)`
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

const DetailCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  border-radius: 10px 10px 0 0;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  margin: 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 30px;
  padding: 0;
  svg {
    transition: all 0.3s ease-in-out;
    color: ${(props) => props.theme.white.lighter};
  }
  &:hover {
    svg {
      color: ${(props) => props.theme.red};
      scale: 1.4;
    }
  }
`;

export default memo(MovieDetail);
