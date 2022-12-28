import { getMovie, IGetMovie } from "API/movieAPI";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";
import { MdClose } from "react-icons/md";
import { memo } from "react";
import ReactStars from "react-stars";

interface IMovieDetailProps {
  movieId: number;
  rowIndex?: number | string | null;
  search?: string;
}

function MovieDetail({ movieId, rowIndex, search }: IMovieDetailProps) {
  const navigate = useNavigate();
  const { data } = useQuery<IGetMovie>(["movie", movieId], () =>
    getMovie(movieId),
  );
  const onOverlayClick = () => {
    navigate(`/search?keyword=${search}`);
  };
  return (
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
        <InfoContainer>
          <Info>
            <Poster src={makeImagePath(data?.movie_detail.poster_path || "")} />
            <Content>
              <Title>
                <h1>{data?.movie_detail.title}</h1>
                <h2>{data?.movie_detail.original_title}</h2>
                <VoteAverage>
                  <ReactStars
                    count={5}
                    value={
                      data?.movie_detail.vote_average
                        ? data.movie_detail.vote_average / 2
                        : 0
                    }
                    color1="#e6e6e6"
                    color2="#fc3"
                    size={20}
                    edit={false}
                  />
                  <span>{data?.movie_detail.vote_average.toFixed(1)}</span>
                </VoteAverage>
              </Title>
              <ContentItem>
                <span>∙ {data?.movie_detail.release_date}</span>
                <span>∙ {data?.movie_detail.runtime}분</span>
                <Genre>
                  ∙
                  {data?.movie_detail.genres.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </Genre>
              </ContentItem>
              <OverviewContainer>
                {data?.movie_detail.tagline ? (
                  <Tagline>{data?.movie_detail.tagline}</Tagline>
                ) : null}
                <Overview>{data?.movie_detail.overview}</Overview>
              </OverviewContainer>
            </Content>
          </Info>
        </InfoContainer>
      </Detail>
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
  width: 760px;
  height: 760px;
  background: ${(props) => props.theme.black.lighter};
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 10px;
  overflow: auto;
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

const InfoContainer = styled.div`
  position: absolute;
  top: 28%;
  padding: 0 40px;
  img {
    width: 40%;
  }
`;

const Info = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const Poster = styled.img`
  border-radius: 10px;
  position: relative;
  top: 80px;
  box-shadow: 2px 2px 4px rgba(47, 47, 47, 0.8);
  transition: scale 0.2s ease-in-out;
  &:hover {
    scale: 1.1;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20%;
  h1 {
    font-size: 28px;
  }
  h2 {
    font-size: 16px;
    color: ${(props) => props.theme.white.darker};
  }
`;

const VoteAverage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const ContentItem = styled.div`
  position: absolute;
  top: 48%;
  display: flex;
  gap: 15px;
`;

const Genre = styled.ul`
  display: flex;
  li {
    margin-left: 4px;
  }
`;

const OverviewContainer = styled.div`
  position: absolute;
  top: 58%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Tagline = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

const Overview = styled.p`
  font-size: 14px;
  color: #c1c1c1;
  padding-right: 40px;
`;

export default memo(MovieDetail);
