import { getSeriesDetail, IGetSeriesDetail } from "API/SeriesAPI";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";
import { MdClose } from "react-icons/md";
import ReactStars from "react-stars";
import { memo } from "react";

interface ISeriesDetailProps {
  seriesId: number;
  rowIndex?: number | string | null;
  search?: string;
}

function SeriesDetail({ seriesId, rowIndex, search }: ISeriesDetailProps) {
  const navigate = useNavigate();
  const { data } = useQuery<IGetSeriesDetail>(["tv", seriesId], () =>
    getSeriesDetail(seriesId),
  );
  const onOverlayClick = () => {
    navigate(`/search?keyword=${search}`);
  };
  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <Detail
        variants={detailVariants}
        layoutId={String((rowIndex + "_" || "") + seriesId)}
        initial="initial"
        animate="click"
        exit="exit"
      >
        <DetailCover
          style={{
            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
              String(data?.series_detail.backdrop_path),
            )})`,
          }}
        >
          <CloseButton onClick={onOverlayClick}>
            <MdClose />
          </CloseButton>
        </DetailCover>
        <InfoContainer>
          <Info>
            <Poster
              src={makeImagePath(data?.series_detail.poster_path || "")}
            />
            <Content>
              <Title>
                <h1>{data?.series_detail.name}</h1>
                <h2>{data?.series_detail.original_name}</h2>
                <VoteAverage>
                  <ReactStars
                    count={5}
                    value={
                      data?.series_detail.vote_average
                        ? data.series_detail.vote_average / 2
                        : 0
                    }
                    color1="#e6e6e6"
                    color2="#fc3"
                    size={20}
                    edit={false}
                  />
                  <span>{data?.series_detail.vote_average.toFixed(1)}</span>
                </VoteAverage>
              </Title>
              <ContentItem>
                <Genre>
                  ∙
                  {data?.series_detail.genres.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </Genre>
              </ContentItem>
              <OverviewContainer>
                <Overview>{data?.series_detail.overview}</Overview>
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
  top: 25%;
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
  top: 55%;
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
  top: 66%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Overview = styled.p`
  font-size: 14px;
  color: #c1c1c1;
  padding-right: 40px;
`;

export default memo(SeriesDetail);
