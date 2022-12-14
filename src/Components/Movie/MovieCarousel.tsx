import { IGetMoviesResult } from "API/movieAPI";
import { makeImagePath } from "API/utils";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

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
      <Carousel>
        <TitleContainer>
          <CarouselTitle onClick={increaseIndex}>{carouselTitle}</CarouselTitle>
          <ButtonContainer>
            <PrevBtn variants={buttonVars} whileHover="hover">
              <MdOutlineKeyboardArrowLeft />
            </PrevBtn>
            <NextBtn variants={buttonVars} whileHover="hover">
              <MdOutlineKeyboardArrowRight />
            </NextBtn>
          </ButtonContainer>
        </TitleContainer>
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
                >
                  <Info variants={infoVars}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
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
    scale: 1.3,
    y: -50,
    transition: {
      delay: 1.1,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      delay: 1.1,
      duration: 0.3,
      type: "tween",
    },
  },
};

const buttonVars = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.1,
      type: "tween",
      duration: 0.3,
    },
  },
};

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 300px;
  padding: 0 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
`;

const CarouselTitle = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NextBtn = styled(motion.button)`
  background: ${props => props.theme.black.veryDark};
  border: 2px solid ${props => props.theme.white.darker};
  width: 30px;
  height: 30px;
  opacity: 0.3;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: ${props => props.theme.white.lighter};
    font-size: 24px;
  }
`;

const PrevBtn = styled(motion.button)`
  background: ${props => props.theme.black.veryDark};
  border: 2px solid ${props => props.theme.white.darker};
  width: 30px;
  height: 30px;
  opacity: 0.3;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: ${props => props.theme.white.lighter};
    font-size: 24px;
  }
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
  padding: 10px;
  background: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    text-align: center;
    font-size: 16px;
  }
`;

export default memo(MovieCarousel);
