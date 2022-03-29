import React, { useEffect, useState } from "react";
import "./media-card.css";
import { PlayIcon } from "../Icons/play";
import { BookmarkIcon } from "../Icons/bookmark";
import { BookmarkOutlineIcon } from "../Icons/bookmark-outline";
import { MovieIcon } from "../Icons/movie";
import { TVSeriesIcon } from "../Icons/tv-series";

export function MediaCard({ bookmarked, trending, data }) {
  const imageBasePath = "https://image.tmdb.org/t/p";

  return (
    <article className="media-card" data-trending={trending}>
      <div className="info">
        <h3>{data.media_type === "movie" ? data.title : data.name}</h3>
        <dl>
          <dt className="visually-hidden">Year released</dt>
          <dd>{data.media_type === "movie" ? data.release_date.substring(0, 4) : data.first_air_date.substring(0, 4)}</dd>
          <dt className="visually-hidden">Category</dt>
          <dd>
            {data.media_type === "movie" ? (
              <>
                <MovieIcon />
                Movie
              </>
            ) : (
              <>
                <TVSeriesIcon />
                TV Series
              </>
            )}
          </dd>
          {data.adult && (
            <>
              <dt className="visually-hidden">Age rating</dt>
              <dd>18+</dd>
            </>
          )}
        </dl>
      </div>
      <div className="bookmark">
        <label>
          <span className="visually-hidden">Bookmark ${data.title}</span>
          <input type="checkbox" name="isBookmarked" className="visually-hidden" defaultChecked={bookmarked} />
          <span>
            <BookmarkIcon className="checked" />
            <BookmarkOutlineIcon className="unchecked" />
          </span>
        </label>
      </div>
      <div className="image-wrapper">
        <img
          srcSet={trending ? `${imageBasePath}/w780/${data.backdrop_path} 480w, ${imageBasePath}/w1280/${data.backdrop_path} 940w` : `${imageBasePath}/w342/${data.poster_path} 328w,${imageBasePath}/w500/${data.poster_path} 440w, ${imageBasePath}/w780/${data.poster_path} 560w`}
          sizes={
            trending
              ? `
  (max-width: 375px) 240px,
  470px
`
              : `
  (max-width: 375px) 164px,
  (max-width: 768px) 220px,
  280px
`
          }
          src={trending ? `${imageBasePath}/w300/${data.backdrop_path}` : `${imageBasePath}/w342/${data.poster_path}`}
          alt=""
          width={trending ? 240 : 164}
          height={trending ? 140 : 110}
        />
        <div className="play-button">
          <PlayIcon />
          Play
        </div>
      </div>
    </article>
  );
}
