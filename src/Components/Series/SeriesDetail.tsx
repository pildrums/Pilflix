import { getSeriesDetail, IGetSeriesDetail } from "API/SeriesAPI";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { PathMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";

interface ISeriesDetailProps {
  seriesMatch?: PathMatch<"seriesId"> | null;
  seriesId: number;
  rowIndex?: number | string | null;
  search?: string;
}

function SeriesDetail({
  seriesMatch,
  seriesId,
  rowIndex,
  search,
}: ISeriesDetailProps) {
  const navigate = useNavigate();
  const { data } = useQuery<IGetSeriesDetail>(["tv", seriesId], () =>
    getSeriesDetail(seriesId),
  );
  const onOverlayClick = () => {
    search ? navigate(`/search?keyword=${search}`) : navigate("/series");
  };
  return (
    <>
      {seriesMatch ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <Card
            variants={detailVariants}
            layoutId={String((rowIndex + "_" || "") + seriesId)}
            initial="initial"
            animate="click"
            exit="exit"
          >
            <CardCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  String(data?.series_detail.backdrop_path),
                )})`,
              }}
            >
              <CardTitleContainer>
                <CardTitle>{data?.series_detail.name}</CardTitle>
                <CardVote>
                  ★ {Number(data?.series_detail.vote_average).toFixed(1)}
                </CardVote>
              </CardTitleContainer>
            </CardCover>
            <CardContent>
              <CardGenres>
                {data?.series_detail.genres.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </CardGenres>
              <CardOverview>{data?.series_detail.overview}</CardOverview>
            </CardContent>
          </Card>
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

const Card = styled(motion.div)`
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

const CardCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
`;

const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 0 20px;
  font-size: 32px;
`;

const CardVote = styled.span`
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

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardGenres = styled.ul`
  display: flex;
  gap: 10px;
  padding: 20px;
  li {
    border: 2px solid ${(props) => props.theme.white.lighter};
    text-align: center;
    line-height: 40px;
    border-radius: 10px;
    padding: 0 15px;
  }
`;

const CardOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
`;

export default SeriesDetail;
