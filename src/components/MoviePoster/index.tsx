import React from "react";
import { MovieType } from "../../types/type";
import { classNames } from "../../utils/helper";
import Style from "./MoviePoster.module.scss";
import { makePosterImageUrl } from "../../service/movie.service";
interface IMoviePosterProps {
  movie: MovieType;
  onClickPoster: (movie: MovieType) => void;
  hover?: boolean;
  className?: string;
  size?: "large" | "small";
}
function MoviePoster({
  movie,
  onClickPoster,
  hover,
  size,
  className,
}: IMoviePosterProps) {
  const posterPath = movie?.poster_path;
  const imageUrl = makePosterImageUrl(posterPath);
  const releaseYear = movie?.release_date?.slice(0, 4);

  return (
    <div
      className={classNames(Style.card, className)}
      onClick={() => onClickPoster(movie)}
    >
      <div
        className={classNames(
          Style.cardBody,
          size && Style[size],
          hover && Style.hover
        )}
        style={{
          backgroundImage: `url(${
            posterPath
              ? imageUrl
              : "https://critics.io/img/movies/poster-placeholder.png"
          })`,
        }}
      />

      {!size && (
        <div className={Style.cardFooter}>
          <p className={Style.movieTitle}>{movie.title} </p>
          <p className={Style.releaseDate}>{releaseYear}</p>
        </div>
      )}
    </div>
  );
}

export default MoviePoster;
