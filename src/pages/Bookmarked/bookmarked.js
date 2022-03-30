import React, { useEffect, useState } from "react";
import { Page } from "../Page";
import { useAppState } from "../../context/AppContext";
import { MediaCard } from "../../components/Media-Card/media-card";
import { SearchIcon } from "../../components/Icons/search";

export function Bookmarked() {
  const { bookmarks } = useAppState();
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedTV, setBookmarkedTV] = useState([]);

  useEffect(() => {
    async function fetchBookmarks() {
      if (!bookmarks) return;
      const promises = bookmarks.map(async (bookmark) => {
        const request = await fetch(`https://api.themoviedb.org/3/${bookmark.type}/${bookmark.id}?api_key=c91380e87602d7394898bced749c5ef8&language=en-US`);
        const data = await request.json();
        data.id = bookmark.id;
        if (bookmark.type === "movie") {
          data.media_type = "movie";
          setBookmarkedMovies((bookmarked) => [...bookmarked, data]);
        }
        if (bookmark.type === "tv") {
          data.media_type = "tv";
          setBookmarkedTV((bookmarked) => [...bookmarked, data]);
        }
      });
      await Promise.all(promises);
    }
    fetchBookmarks();
  }, [bookmarks]);

  return (
    <Page className="bookmarked">
      <form className="search-input">
        <SearchIcon></SearchIcon>
        <label htmlFor="search" className="visually-hidden">
          Search for bookmarked shows
        </label>
        <input type="search" placeholder="Search for movies or TV Series" autoComplete="off" autoCorrect="off" autoCapitalize="off" id="search" name="query" />
      </form>
      <section aria-labelledby="section-title">
        <h2 id="section-title">Bookmarked Movies</h2>
        <div className="media-grid">
          {bookmarkedMovies?.length !== 0 &&
            bookmarkedMovies.map((el) => {
              return <MediaCard key={el.id} trending={false} data={el} type="movie" id={el.id}></MediaCard>;
            })}
        </div>
      </section>
      <section aria-labelledby="section-title">
        <h2 id="section-title">Bookmarked TV Series</h2>
        <div className="media-grid">
          {bookmarkedTV?.length !== 0 &&
            bookmarkedTV.map((el) => {
              return <MediaCard key={el.id} trending={false} data={el} type="tv" id={el.id}></MediaCard>;
            })}
        </div>
      </section>
    </Page>
  );
}
