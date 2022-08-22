import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Style from "./CastModal.module.scss";
import { makeRequest } from "../../service/movie.service";
import PersonInfo from "../PersonInfo";
import { MovieType, PersonType } from "../../types/type";

interface ICastModalProps {
  castPerson: PersonType;
  onCloseModal: () => void;
  onClickMovie: (mve?: MovieType) => void;
}
function CastModal({ castPerson: person, onCloseModal, onClickMovie }: any) {
  const [personInternal, setPersonInternal] = useState<PersonType>();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((resp) => resp.json())
        .then((person) => setPersonInternal(person));
    }
  }, [url]);

  useEffect(() => {
    console.log({ person });
    setUrl(makeRequest(`/person/${person?.id}`));
  }, [person.id]);

  return (
    <div className={Style.main}>
      <div className={Style.card}>
        <div>
          <div className={Style.closeIcon} onClick={onCloseModal}>
            <FaTimes />
          </div>

          {personInternal && (
            <PersonInfo person={personInternal} onClickMovie={onClickMovie} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CastModal;
