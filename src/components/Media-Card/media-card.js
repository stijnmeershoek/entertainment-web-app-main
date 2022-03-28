import React from "react";
import "./media-card.css";
import { PlayIcon } from "../Icons/play";
import { BookmarkIcon } from "../Icons/bookmark";
import { BookmarkOutlineIcon } from "../Icons/bookmark-outline";
import { MovieIcon } from "../Icons/movie";
import { TVSeriesIcon } from "../Icons/tv-series";

export function MediaCard({ title = "1998", bookmarked, trending }) {
  const media = {
    title: title,
    isMovie: true,
    release: "2021",
    age: "18+",
  };

  return (
    <article className="media-card">
      <div className="info">
        <h3>{media.title}</h3>
        <dl>
          <dt className="visually-hidden">Year released</dt>
          <dd className="font-size-200">{media.release}</dd>
          <dt className="visually-hidden">Category</dt>
          <dd className="font-size-200">
            {media.isMovie ? (
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
          <dt className="visually-hidden">Age rating</dt>
          <dd className="font-size-200">{media.age}</dd>
        </dl>
      </div>
      <div className="bookmark">
        <label>
          <span className="visually-hidden">Bookmark ${media.title}</span>
          <input type="checkbox" name="isBookmarked" className="visually-hidden" defaultChecked={bookmarked} />
          <span>
            <BookmarkIcon className="checked" />
            <BookmarkOutlineIcon className="unchecked" />
          </span>
        </label>
      </div>
      <div className="image-wrapper">
        <img
          srcSet={
            trending
              ? `${require(`../../assets/thumbnails/${media.title}/${trending ? "trending" : "regular"}/small.jpg`)} 480w, ${require(`../../assets/thumbnails/${media.title}/${trending ? "trending" : "regular"}/large.jpg`)} 940w`
              : `${require(`../../assets/thumbnails/${media.title}/${trending ? "trending" : "regular"}/small.jpg`)} 328w,${require(`../../assets/thumbnails/${media.title}/${trending ? "trending" : "regular"}/medium.jpg`)} 440w, ${require(`../../assets/thumbnails/${media.title}/${trending ? "trending" : "regular"}/large.jpg`)} 560w`
          }
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
          src={trending ? require(`../../assets/thumbnails/${media.title}/${trending ? "trending" : "regular"}/small.jpg`) : require(`../../assets/thumbnails/${media.title}/${trending ? "trending" : "regular"}/small.jpg`)}
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
