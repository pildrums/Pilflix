import { getSeries, IGetSeries } from "API/SeriesAPI";
import Loader from "Components/Loader";
import SeriesBanner from "Components/Series/SeriesBanner";
import SeriesCarousel from "Components/Series/SeriesCarousel";
import SeriesDetail from "Components/Series/SeriesDetail";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const carouselTitle = {
  popular: "가장 인기있는 시리즈",
  onTheAir: "현재 방영중인 시리즈",
  topLated: "지금 뜨는 시리즈",
};

const SERIES = "series";
const POPULAR = 0;
const ON_THE_AIR = 1;
const TOP_LATED = 2;

function Series() {
  const navigate = useNavigate();
  const seriesMatch = useMatch(`/${SERIES}/:seriesId`);
  const { data, isLoading } = useQuery<IGetSeries>(["tv"], getSeries);
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const onBoxClicked = (seriesId: number) => {
    setRowIndex(rowIndex);
    navigate(`/series/${seriesId}`);
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SeriesBanner data={data} />
          <SeriesCarousel
            data={data?.popular_series}
            carouselTitle={carouselTitle.popular}
            onBoxClicked={onBoxClicked}
            rowIndex={POPULAR}
          />
          <SeriesCarousel
            data={data?.onTheAir_series}
            carouselTitle={carouselTitle.onTheAir}
            onBoxClicked={onBoxClicked}
            rowIndex={ON_THE_AIR}
          />
          <SeriesCarousel
            data={data?.topLated_series}
            carouselTitle={carouselTitle.topLated}
            onBoxClicked={onBoxClicked}
            rowIndex={TOP_LATED}
          />
          <AnimatePresence>
            {seriesMatch ? (
              <SeriesDetail
                seriesMatch={seriesMatch}
                seriesId={Number(seriesMatch.params.seriesId)}
                rowIndex={rowIndex}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #000;
`;

export default Series;
