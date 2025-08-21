import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchPage from "./pages/SearchPage";
import Navbar from "./components/Navbar";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
