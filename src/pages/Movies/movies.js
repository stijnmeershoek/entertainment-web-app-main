import React, { useEffect, useState } from "react";
import { Page } from "../Page";
import { MediaCard } from "../../components/Media-Card/media-card";
import { SearchIcon } from "../../components/Icons/search";

export function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c91380e87602d7394898bced749c5ef8&language=en-US&query=${searchTerm}&page=1`);
      const search = await data.json();
      setSearchResults(search.results);
    }, 750);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    async function fetchPopular() {
      const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=c91380e87602d7394898bced749c5ef8&language=en-US&page=1`);
      const popular = await data.json();
      setMovies(popular.results);
    }
    fetchPopular();
  }, []);

  return (
    <Page className="home">
      <form className="search-input">
        <SearchIcon></SearchIcon>
        <label htmlFor="search" className="visually-hidden">
          Search for a Movie
        </label>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search for a Movie"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          id="search"
          name="query"
        />
      </form>
      {searchResults.length !== 0 ? (
        <section aria-labelledby="section-title-search">
          <h2 id="section-title-search">
            Found {searchResults.length} {searchResults.length > 1 ? "results" : "result"} for '{searchTerm}'
          </h2>
          <div className="media-grid">
            {searchResults.map((el) => {
              el.media_type = "movie";
              return <MediaCard key={el.id} trending={false} data={el}></MediaCard>;
            })}
          </div>
        </section>
      ) : (
        <section aria-labelledby="section-title-movies">
          <h2 id="section-title-movies">Movies</h2>
          <div className="media-grid">
            {movies.length !== 0 &&
              movies.map((el) => {
                el.media_type = "movie";
                return <MediaCard key={el.id} trending={false} data={el}></MediaCard>;
              })}
          </div>
        </section>
      )}
    </Page>
  );
}
