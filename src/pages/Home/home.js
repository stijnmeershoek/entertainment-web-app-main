import React from "react";
import "./home.css";
import { Page } from "../Page";
import { useAppState } from "../../context/AppContext";
import { Slider } from "../../components/Media-Reel/media-reel";
import { MediaCard } from "../../components/Media-Card/media-card";
import { SearchIcon } from "../../components/Icons/search";

export function Home() {
  const { trending } = useAppState();

  return (
    <Page className="home">
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
            return <MediaCard key={el.id} trending={true} data={el}></MediaCard>;
          })}
        </Slider>
      </section>
      <section aria-labelledby="section-title">
        <h2 id="section-title">Recommended for you</h2>
        <div className="media-grid">
          {trending.map((el) => {
            if (el.media_type !== "movie" && el.media_type !== "tv") return;
            return <MediaCard key={el.id} trending={false} data={el}></MediaCard>;
          })}
        </div>
      </section>
    </Page>
  );
}
