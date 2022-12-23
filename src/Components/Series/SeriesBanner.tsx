import { IGetSeries } from "API/SeriesAPI";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";

interface ISeriesBannerProps {
  data: IGetSeries | undefined;
}

function SeriesBanner({ data }: ISeriesBannerProps) {
  const navigate = useNavigate();
  const onBoxClicked = (seriesId: number) => {
    navigate(`/series/${seriesId}`);
  };
  return (
    <Banner
      bgphoto={makeImagePath(
        data?.popular_series.results[0].backdrop_path || "",
      )}
    >
      <Title>{data?.popular_series.results[0].name}</Title>
      <Overview>{data?.popular_series.results[0].overview}</Overview>
      <BannerContent>
        <Vote>★ {data?.popular_series.results[0].vote_average}</Vote>
        <BannerButton
          onClick={() =>
            onBoxClicked(Number(data?.popular_series.results[0].id))
          }
        >
          자세히보기
        </BannerButton>
      </BannerContent>
    </Banner>
  );
}

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

const BannerContent = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const Vote = styled.span`
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

const BannerButton = styled.button`
  width: 160px;
  height: 50px;
  user-select: none;
  cursor: pointer;
  background: ${(props) => props.theme.white.darker};
  border: none;
  border-radius: 10px;
  font-size: 16px;
  line-height: 50px;
`;

export default SeriesBanner;
