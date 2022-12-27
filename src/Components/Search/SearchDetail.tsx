import { motion } from "framer-motion";
import { PathMatch } from "react-router-dom";
import styled from "styled-components";

interface SearchDetailProps {
  searchMatch: PathMatch<"searchId"> | null;
}

function SearchDetail({ searchMatch }: SearchDetailProps) {
  return (
    <>
      {searchMatch ? (
        <>
          <Overlay />
          <Detail>SearchDetail</Detail>
        </>
      ) : null}
    </>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
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

export default SearchDetail;
