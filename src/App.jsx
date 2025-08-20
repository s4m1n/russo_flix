import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
