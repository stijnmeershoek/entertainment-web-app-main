import React, { useEffect, useState } from "react";
import { Page } from "../Page";
import { MediaCard } from "../../components/Media-Card/media-card";
import { SearchIcon } from "../../components/Icons/search";

export function Shows() {
  const [shows, setShows] = useState([]);

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
        <input type="search" placeholder="Search for TV Series" autoComplete="off" autoCorrect="off" autoCapitalize="off" id="search" name="query" />
      </form>
      <section aria-labelledby="section-title">
        <h2 id="section-title">TV Series</h2>
        <div className="media-grid">
          {shows.length !== 0 &&
            shows.map((el) => {
              el.media_type = "tv";
              return <MediaCard key={el.id} trending={false} data={el}></MediaCard>;
            })}
        </div>
      </section>
    </Page>
  );
}
