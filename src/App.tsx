import Header from "Components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "Routes/Error";
import Movies from "Routes/Movies";
import Search from "Routes/Search";
import Series from "Routes/Series";

function App() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:movieId" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/series/:seriesId" element={<Series />} />
          <Route path="/search" element={<Search />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
