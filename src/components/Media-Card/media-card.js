import React, { useEffect, useState } from "react";
import "./media-card.css";
import { PlayIcon } from "../Icons/play";
import { BookmarkIcon } from "../Icons/bookmark";
import { BookmarkOutlineIcon } from "../Icons/bookmark-outline";
import { MovieIcon } from "../Icons/movie";
import { TVSeriesIcon } from "../Icons/tv-series";

export function MediaCard({ title = "1998", bookmarked, trending }) {
  const [small, setSmall] = useState();
  const [medium, setMedium] = useState();
  const [large, setLarge] = useState();

  const media = {
    title: title,
    isMovie: true,
    release: "2021",
    age: "18+",
  };

  useEffect(() => {
    if (trending) {
      const small = require(`../../assets/thumbnails/${media.title}/trending/small.jpg`);
      const large = require(`../../assets/thumbnails/${media.title}/trending/large.jpg`);
      setSmall(small);
      setLarge(large);
    } else {
      const small = require(`../../assets/thumbnails/${media.title}/regular/small.jpg`);
      const medium = require(`../../assets/thumbnails/${media.title}/regular/medium.jpg`);
      const large = require(`../../assets/thumbnails/${media.title}/regular/large.jpg`);
      setSmall(small);
      setMedium(medium);
      setLarge(large);
    }
  }, []);

  return (
    <article className="media-card" data-trending={trending}>
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
          srcSet={trending ? `${small} 480w, ${large} 940w` : `${small} 328w,${medium} 440w, ${large} 560w`}
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
          src={small}
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
