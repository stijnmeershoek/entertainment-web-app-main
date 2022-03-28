import React from "react";
import "./home.css";
import { Page } from "../Page";
import ScrollContainer from "react-indiana-drag-scroll";
import { MediaCard } from "../../components/Media-Card/media-card";

import { SearchIcon } from "../../components/Icons/search";

export function Home({ reverse, setReverse }) {
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
        <div className="horizontal-slider">
          <ScrollContainer vertical={false} className="media-reel overflowing" role="list">
            <MediaCard bookmarked={false} trending={true}></MediaCard>
            <MediaCard bookmarked={false} trending={true}></MediaCard>
            <MediaCard bookmarked={false} trending={true}></MediaCard>
            <MediaCard bookmarked={false} trending={true}></MediaCard>
            <MediaCard bookmarked={false} trending={true}></MediaCard>
          </ScrollContainer>
        </div>
      </section>
      <section aria-labelledby="section-title">
        <h2 id="section-title">Recommended for you</h2>
        <div className="media-grid">
          <MediaCard title="dogs" bookmarked={false} trending={false}></MediaCard>
          <MediaCard title="community-of-ours" bookmarked={false} trending={false}></MediaCard>
          <MediaCard title="during-the-hunt" bookmarked={false} trending={false}></MediaCard>
          <MediaCard title="whispering-hill" bookmarked={false} trending={false}></MediaCard>
          <MediaCard title="the-great-lands" bookmarked={false} trending={false}></MediaCard>
        </div>
      </section>
    </Page>
  );
}
