import { IGetMoviesResult } from "API/movieAPI";
import { makeImagePath } from "API/utils";
import styled from "styled-components";

interface IMovieBannerProps {
  data: IGetMoviesResult;
}

function MovieBanner({ data }: IMovieBannerProps) {
  return (
    <Banner bgphoto={makeImagePath(data.results[0].backdrop_path || "")}>
      <Title>{data.results[0].title}</Title>
      <Overview>{data.results[0].overview}</Overview>
      <BannerContent>
        <Vote>★ {data.results[0].vote_average}</Vote>
        <BannerButton>자세히보기</BannerButton>
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

export default MovieBanner;
