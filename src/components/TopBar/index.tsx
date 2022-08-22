import React, { useState, useEffect } from "react";
import Style from "./TopBar.module.scss";
import { FaSearch, FaTimes } from "react-icons/fa";
import { makeRequest } from "../../service/movie.service";
import { classNames } from "../../utils/helper";

const TopBar = ({ onSearchMovies }: any) => {
  const [isExpandSearch, setIsExpandSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const baseUrl = makeRequest("/search/movie");
  const url = `${baseUrl}&query=${search}`;

  useEffect(() => {
    if (searchResults) {
      onSearchMovies(searchResults);
    }
  }, [searchResults, onSearchMovies]);

  useEffect(() => {
    if (search) {
      fetch(url)
        .then((resp) => resp.json())
        .then((search) => setSearchResults(search.results));
    } else {
      setSearchResults([]);
    }
  }, [url, search]);
  return (
    <div className={Style.container}>
      <div className={Style.innerContainer}>
        <div className={Style.brandContainer}>
          <h1>
            <span className={Style.abbr}>mp</span>
            <span className={Style.full}>moviepedia</span>
          </h1>
        </div>

        <div className={Style.searchContainer}>
          <span>
            <FaSearch
              onClick={() => {
                setIsExpandSearch((isExapand) => !isExapand);
              }}
            />
          </span>
          {isExpandSearch && (
            <>
              <input
                className={Style.searchInput}
                type={"text"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <span
                onClick={() => {
                  setSearch("");
                  setIsExpandSearch((isExapand) => !isExapand);
                }}
              >
                <FaTimes />
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
