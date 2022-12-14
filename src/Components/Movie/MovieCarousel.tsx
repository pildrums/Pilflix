import { IGetMoviesResult } from "API/movieAPI";
import { makeImagePath } from "API/utils";
import Loader from "Components/Loader";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";
import styled from "styled-components";

interface IMovieCarouselProps {
  data: IGetMoviesResult;
  carouselTitle: string;
}

const offset = 6;

function MovieCarousel({ data, carouselTitle }: IMovieCarouselProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Wrapper>
      <CarouselTitle onClick={increaseIndex}>{carouselTitle}</CarouselTitle>
      <Carousel>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={index}
            transition={{ type: "tween", duration: 1 }}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  key={movie.id}
                  bgphoto={makeImagePath(movie.backdrop_path)}
                  variants={boxVars}
                  initial="normal"
                  whileHover="hover"
                />
              ))}
          </Row>
        </AnimatePresence>
      </Carousel>
    </Wrapper>
  );
}

const rowVars = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVars = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      delay: 1.1,
    },
  },
};

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 250px;
  @media all and (max-width: 500px) {
    margin-bottom: 13vw;
  }
`;

const CarouselTitle = styled.div`
  position: relative;
  top: -100px;
  margin: 10px 0;
  font-size: 20px;
  padding: 0 20px;
  cursor: pointer;
`;

const Carousel = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  width: 100%;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  padding: 0 20px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background: #fff;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 20px;
  background: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: relative;
  width: 100%;
  bottom: -200px;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const NextBtn = styled(motion.button)`
  position: absolute;
  background: #fff;
  border: none;
  height: 200px;
  right: 0;
  top: -66px;
  opacity: 0;
  cursor: pointer;
  svg {
    font-size: 18px;
  }
`;

const PrevBtn = styled(motion.button)`
  left: 0;
  position: absolute;
  background: #fff;
  border: none;
  height: 200px;
  top: -66px;
  opacity: 0;
  cursor: pointer;
  svg {
    font-size: 18px;
  }
`;

export default memo(MovieCarousel);
