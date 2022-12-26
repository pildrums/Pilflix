import { IGetSeries } from "API/SeriesAPI";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";
import { MdInfoOutline, MdPlayCircle } from "react-icons/md";

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
        <BannerButton>
          <MdPlayCircle />
          재생하기
          <NotWorking>
            <MdInfoOutline />
            재생하기는 현재 서비스되지 않습니다.
          </NotWorking>
        </BannerButton>
        <BannerButton
          onClick={() =>
            onBoxClicked(Number(data?.popular_series.results[0].id))
          }
        >
          <MdInfoOutline />
          상세정보
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

const BannerButton = styled.button`
  width: 160px;
  height: 50px;
  user-select: none;
  cursor: pointer;
  background: ${(props) => props.theme.white.lighter};
  border: none;
  border-radius: 10px;
  font-size: 16px;
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  transition: scale 0.3s ease-in-out;
  svg {
    font-size: 20px;
  }
  &:first-child {
    background: rgba(0, 0, 0, 0.6);
    color: ${(props) => props.theme.white.lighter};
    border: 2px solid ${(props) => props.theme.white.lighter};
    cursor: not-allowed;
    &:hover {
      div {
        opacity: 1;
        top: 120%;
        left: 0;
        transition: all 0.2s ease-in-out;
      }
    }
  }
  &:hover {
    scale: 1.1;
  }
`;

const NotWorking = styled.div`
  position: absolute;
  top: 120%;
  left: 0;
  border: 1px solid #fff;
  padding: 3px;
  background: #fff;
  border-radius: 10px;
  color: ${(props) => props.theme.red};
  opacity: 0;
  font-size: 12px;
  width: 200px;
  line-height: 30px;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default SeriesBanner;
