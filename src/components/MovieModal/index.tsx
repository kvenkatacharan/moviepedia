import React, { useState, useEffect } from "react";
import {
  MovieType,
  MovieInfoType,
  PersonType,
  CastType,
} from "../../types/type";
import MovieInfo from "../MovieInfo";
import { FaTimes } from "react-icons/fa";

import Style from "./MovieModal.module.scss";
import { makeBackdropImageUrl, makeRequest } from "../../service/movie.service";
interface IMovieModalProps {
  movie: MovieType;
  onCloseModal: (bool: boolean) => void;
  onClickCastCard: (castPerson: CastType) => void;
}
export default function MovieModal({
  movie,
  onCloseModal,
  onClickCastCard,
}: IMovieModalProps) {
  const backdrop = movie.backdrop_path;
  const bgUrl = makeBackdropImageUrl(backdrop);
  const url = makeRequest(`/movie/${movie.id}`);
  const [movieInternal, setMovieInternal] = useState<MovieInfoType>();
  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((movie) => setMovieInternal(movie));
  }, [url]);

  const style = {
    backgroundImage: `url(${bgUrl})`,
  };

  return (
    <div className={Style.container}>
      <div className={Style.card} style={style}>
        <div className={Style.cardBody}>
          <span
            className={Style.icon}
            onClick={() => {
              onCloseModal(false);
            }}
          >
            <FaTimes />
          </span>
          {movieInternal && (
            <MovieInfo
              movie={movieInternal}
              onClickCastCard={onClickCastCard}
            />
          )}
        </div>
      </div>
    </div>
  );
}
