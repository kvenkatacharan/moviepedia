import React from "react";
import { makePosterImageUrl } from "../../service/movie.service";
import { CastType } from "../../types/type";
import Style from "./CastCard.module.scss";
interface IMCastCardProps {
  castPerson: CastType;
  onClickCastCard: (castPerson: CastType) => void;
}
function CastCard({ castPerson, onClickCastCard }: IMCastCardProps) {
  const photoPath = castPerson?.profile_path;
  const imageUrl = makePosterImageUrl(photoPath);

  return (
    <div
      className={Style.mainContainer}
      onClick={() => onClickCastCard(castPerson)}
    >
      {" "}
      <div
        className={Style.poster}
        style={{
          backgroundImage: `url(${
            photoPath
              ? imageUrl
              : "https://d3uscstcbhvk7k.cloudfront.net/static/images/slider-placeholder-2x.png"
          })`,
        }}
      />
      <div className={Style.textInfo}>
        <h4>{castPerson.name}</h4>
        <p>{castPerson.character}</p>
      </div>
    </div>
  );
}

export default CastCard;
