import React, { useEffect, useState } from "react";
import "./home.css";
import { Page } from "../Page";
import { Slider } from "../../components/Media-Reel/media-reel";
import { MediaCard } from "../../components/Media-Card/media-card";
import { SearchIcon } from "../../components/Icons/search";

export function Home({ reverse, setReverse }) {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      const data = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=c91380e87602d7394898bced749c5ef8`);
      const trending = await data.json();
      setTrending(trending.results);
    }
    fetchTrending();
  }, []);

  return (
    <Page className="home" reverse={reverse} setReverse={setReverse}>
      <form className="search-input">
        <SearchIcon></SearchIcon>
        <label htmlFor="search" className="visually-hidden">
          Search for movies or TV Series
        </label>
        <input type="search" placeholder="Search for movies or TV Series" autoComplete="off" autoCorrect="off" autoCapitalize="off" id="search" name="query" />
      </form>
      <section aria-labelledby="section-title">
        <h2 id="section-title">Trending</h2>
        <Slider>
          {trending.map((el) => {
            if (el.media_type !== "movie" && el.media_type !== "tv") return;
            return <MediaCard key={el.id} bookmarked={false} trending={true} data={el}></MediaCard>;
          })}
        </Slider>
      </section>
      <section aria-labelledby="section-title">
        <h2 id="section-title">Recommended for you</h2>
        <div className="media-grid">
          {trending.map((el) => {
            if (el.media_type !== "movie" && el.media_type !== "tv") return;
            return <MediaCard key={el.id} bookmarked={false} trending={false} data={el}></MediaCard>;
          })}
        </div>
      </section>
    </Page>
  );
}
