import { IGetSeriesResult } from "API/SeriesAPI";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";
import styled from "styled-components";
import { makeImagePath, useWindowDimensions } from "utils";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface ISeriesCarouselProps {
  data: IGetSeriesResult | undefined;
  carouselTitle: string;
  onBoxClicked: (seriesId: number, rowIndex: number) => void;
  rowIndex: number;
}

const offset = 6;

function SeriesCarousel({
  data,
  carouselTitle,
  onBoxClicked,
  rowIndex,
}: ISeriesCarouselProps) {
  const width = useWindowDimensions();
  const [index, setIndex] = useState<number[]>([0, 0, 0]);
  const [leaving, setLeaving] = useState(false);
  const [next, setNext] = useState(false);
  const custom = { next, width };
  const changeIndex = (next: boolean, rowIndex: number) => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      setNext(next);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      next
        ? setIndex((prev) => {
            const result = [...prev];
            result[rowIndex] === maxIndex
              ? (result[rowIndex] = 0)
              : (result[rowIndex] += 1);
            return result;
          })
        : setIndex((prev) => {
            const result = [...prev];
            result[rowIndex] === 0
              ? (result[rowIndex] = maxIndex)
              : (result[rowIndex] -= 1);
            return result;
          });
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Wrapper>
      <Carousel>
        <TitleContainer>
          <CarouselTitle>{carouselTitle}</CarouselTitle>
          <ButtonContainer>
            <PrevBtn
              variants={buttonVars}
              whileHover="hover"
              onClick={() => changeIndex(false, rowIndex)}
              key="prev"
            >
              <MdOutlineKeyboardArrowLeft />
            </PrevBtn>
            <NextBtn
              variants={buttonVars}
              whileHover="hover"
              onClick={() => changeIndex(true, rowIndex)}
              key="next"
            >
              <MdOutlineKeyboardArrowRight />
            </NextBtn>
          </ButtonContainer>
        </TitleContainer>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={custom}
        >
          <Row
            variants={rowVars}
            initial="entry"
            animate="center"
            exit="exit"
            key={index[rowIndex]}
            transition={{ type: "tween", duration: 1 }}
            custom={custom}
          >
            {rowIndex === 0
              ? data?.results
                  .slice(1)
                  .slice(
                    offset * index[rowIndex],
                    offset * index[rowIndex] + offset,
                  )
                  .map((series) => (
                    <Box
                      layoutId={String(rowIndex + "_" + series.id)}
                      key={series.id}
                      bgphoto={makeImagePath(series.poster_path)}
                      variants={boxVars}
                      initial="normal"
                      whileHover="hover"
                      onClick={() => onBoxClicked(series.id, rowIndex)}
                    >
                      <Info variants={infoVars}>
                        <h4>{series.name}</h4>
                      </Info>
                    </Box>
                  ))
              : data?.results
                  .slice(
                    offset * index[rowIndex],
                    offset * index[rowIndex] + offset,
                  )
                  .map((series) => (
                    <Box
                      layoutId={String(rowIndex + "_" + series.id)}
                      key={series.id}
                      bgphoto={makeImagePath(series.poster_path)}
                      variants={boxVars}
                      initial="normal"
                      whileHover="hover"
                      onClick={() => onBoxClicked(series.id, rowIndex)}
                    >
                      <Info variants={infoVars}>
                        <h4>{series.name}</h4>
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
  entry: ({ next, width }: { next: boolean; width: number }) => {
    return {
      x: next ? width : -width,
    };
  },
  center: {
    x: 0,
    scale: 1,
    transition: { duration: 1 },
  },
  exit: ({ next, width }: { next: boolean; width: number }) => {
    return {
      x: next ? -width : width,
      transition: {
        duration: 1,
      },
    };
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
  user-select: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NextBtn = styled(motion.button)`
  background: ${(props) => props.theme.black.veryDark};
  border: 2px solid ${(props) => props.theme.white.darker};
  width: 30px;
  height: 30px;
  opacity: 0.3;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: ${(props) => props.theme.white.lighter};
    font-size: 24px;
  }
`;

const PrevBtn = styled(motion.button)`
  background: ${(props) => props.theme.black.veryDark};
  border: 2px solid ${(props) => props.theme.white.darker};
  width: 30px;
  height: 30px;
  opacity: 0.3;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: ${(props) => props.theme.white.lighter};
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

export default memo(SeriesCarousel);
