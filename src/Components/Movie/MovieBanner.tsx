import { IGetMovies } from "API/movieAPI";
import { makeImagePath } from "utils";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdInfoOutline, MdPlayCircle } from "react-icons/md";

interface IMovieBannerProps {
  data: IGetMovies | undefined;
}

function MovieBanner({ data }: IMovieBannerProps) {
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <Banner
      bgphoto={makeImagePath(
        data?.playing_movie.results[0].backdrop_path || "",
      )}
    >
      <Title>{data?.playing_movie.results[0].title}</Title>
      <Overview>{data?.playing_movie.results[0].overview}</Overview>
      <BannerContent>
        <BannerButton>
          <MdPlayCircle />
          재생하기
        </BannerButton>
        <BannerButton
          onClick={() =>
            onBoxClicked(Number(data?.playing_movie.results[0].id))
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
  font-weight: 400;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

const BannerContent = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 15px;
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
    color: #fff;
  }
  &:hover {
    scale: 1.1;
  }
`;

export default MovieBanner;
