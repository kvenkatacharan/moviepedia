import { makeRequest } from "../../service/movie.service";
import { classNames } from "../../utils/helper";
import { useState, useEffect } from "react";
import MoviePoster from "../MoviePoster";
import Style from "./home.module.scss";
import { MovieType, PersonType, CastType } from "../../types/type";
import MovieModal from "../MovieModal";
import CastModal from "../CastModal";
interface IHome {
  searchResults: MovieType[];
}
function Home({ searchResults }: IHome) {
  const url = makeRequest("/movie/popular");
  const [popularMovies, setPopularMovies] = useState<MovieType[]>([]);
  const [showMovie, setShowMovie] = useState<boolean>(false);
  const [showCast, setShowCast] = useState<boolean>(false);
  const [movie, setMovie] = useState<MovieType>();
  const [castPerson, setcastPerson] = useState<CastType>();

  function handleClickPoster(movie: MovieType) {
    setShowMovie(true);
    setMovie(movie);
  }
  function handleClickCastCard(castPerson: CastType) {
    setShowMovie(false);
    setcastPerson(castPerson);
    setShowCast(true);
  }
  function onClickMovie(movie: MovieType) {
    setShowCast(false);
    setShowMovie(true);
    setMovie(movie);
  }

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((movies) => setPopularMovies(movies.results));
  }, [url]);

  return (
    <div className={classNames(Style.main, showMovie && Style.showMovie)}>
      {showMovie && movie && (
        <MovieModal
          movie={movie}
          onCloseModal={() => setShowMovie(false)}
          onClickCastCard={handleClickCastCard}
        />
      )}
      {searchResults.length > 0
        ? searchResults.map((movie, index) => (
            <MoviePoster
              key={index}
              movie={movie}
              onClickPoster={handleClickPoster}
              hover={true}
            />
          ))
        : popularMovies.map((movie, index) => (
            <MoviePoster
              key={index}
              movie={movie}
              onClickPoster={handleClickPoster}
              hover={true}
            />
          ))}
      {showCast && castPerson?.id && (
        <CastModal
          castPerson={castPerson}
          onCloseModal={() => setShowCast(false)}
          onClickMovie={(movie: MovieType) => onClickMovie(movie)}
        />
      )}
    </div>
  );
}

export default Home;
