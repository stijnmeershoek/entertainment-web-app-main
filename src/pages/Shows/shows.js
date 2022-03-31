import React, { useEffect, useState } from "react";
import { Page } from "../Page";
import { MediaCard } from "../../components/Media-Card/media-card";
import { SearchIcon } from "../../components/Icons/search";

export function Shows() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }
      const data = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=c91380e87602d7394898bced749c5ef8&language=en-US&query=${searchTerm}&page=1`);
      const search = await data.json();
      setSearchResults(search.results);
    }, 750);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    async function fetchPopular() {
      const data = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=c91380e87602d7394898bced749c5ef8&language=en-US&page=1`);
      const popular = await data.json();
      setShows(popular.results);
    }
    fetchPopular();
  }, []);

  return (
    <Page className="home">
      <form className="search-input">
        <SearchIcon></SearchIcon>
        <label htmlFor="search" className="visually-hidden">
          Search for TV Series
        </label>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search for TV Series"
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
              el.media_type = "tv";
              return <MediaCard key={el.id} trending={false} data={el}></MediaCard>;
            })}
          </div>
        </section>
      ) : (
        <section aria-labelledby="section-title-movies">
          <h2 id="section-title-movies">TV Series</h2>
          <div className="media-grid">
            {shows.length !== 0 &&
              shows.map((el) => {
                el.media_type = "tv";
                return <MediaCard key={el.id} trending={false} data={el}></MediaCard>;
              })}
          </div>
        </section>
      )}
    </Page>
  );
}
