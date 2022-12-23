import { getSeries, IGetSeries } from "API/SeriesAPI";
import Loader from "Components/Loader";
import SeriesBanner from "Components/Series/SeriesBanner";
import { useQuery } from "react-query";
import styled from "styled-components";

function Series() {
  const { data, isLoading } = useQuery<IGetSeries>(["tv"], getSeries);
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SeriesBanner data={data} />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #000;
`;

export default Series;
