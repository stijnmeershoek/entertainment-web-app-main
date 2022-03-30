import React, { useEffect, useState } from "react";
import { Page } from "../Page";
import { MediaCard } from "../../components/Media-Card/media-card";
import { SearchIcon } from "../../components/Icons/search";

export function Movies() {
  const [movies, setMovies] = useState([]);

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
        <input type="search" placeholder="Search for a Movie" autoComplete="off" autoCorrect="off" autoCapitalize="off" id="search" name="query" />
      </form>
      <section aria-labelledby="section-title">
        <h2 id="section-title">Movies</h2>
        <div className="media-grid">
          {movies.length !== 0 &&
            movies.map((el) => {
              el.media_type = "movie";
              return <MediaCard key={el.id} trending={false} data={el}></MediaCard>;
            })}
        </div>
      </section>
    </Page>
  );
}
