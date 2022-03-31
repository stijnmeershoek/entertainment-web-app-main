import React, { useState, useEffect } from "react";
import "./home.css";
import { Page } from "../Page";
import { useAppState } from "../../context/AppContext";
import { Slider } from "../../components/Media-Reel/media-reel";
import { MediaCard } from "../../components/Media-Card/media-card";
import { SearchIcon } from "../../components/Icons/search";

export function Home() {
  const { trending } = useAppState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }
      const data = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=c91380e87602d7394898bced749c5ef8&language=en-US&query=${searchTerm}&page=1`);
      const search = await data.json();
      setSearchResults(search.results);
    }, 750);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <Page className="home">
      <form className="search-input">
        <SearchIcon></SearchIcon>
        <label htmlFor="search" className="visually-hidden">
          Search for movies or TV Series
        </label>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search for movies or TV Series"
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
              return <MediaCard key={el.id} trending={false} data={el}></MediaCard>;
            })}
          </div>
        </section>
      ) : (
        <>
          <section aria-labelledby="section-title-trending">
            <h2 id="section-title-trending">Trending</h2>
            <Slider>
              {trending.map((el) => {
                if (el.media_type !== "movie" && el.media_type !== "tv") return;
                return <MediaCard key={el.id} trending={true} data={el}></MediaCard>;
              })}
            </Slider>
          </section>
          <section aria-labelledby="section-title-rec">
            <h2 id="section-title-rec">Recommended for you</h2>
            <div className="media-grid">
              {trending.map((el) => {
                if (el.media_type !== "movie" && el.media_type !== "tv") return;
                return <MediaCard key={el.id} trending={false} data={el}></MediaCard>;
              })}
            </div>
          </section>
        </>
      )}
    </Page>
  );
}
