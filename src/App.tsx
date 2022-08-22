import React, { useState } from "react";
import Home from "./components/Home";
import TopBar from "./components/TopBar";
import { MovieType } from "./types/type";
function App() {
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  return (
    <div className="App">
      <TopBar onSearchMovies={setSearchResults} />
      <Home searchResults={searchResults} />
    </div>
  );
}

export default App;
