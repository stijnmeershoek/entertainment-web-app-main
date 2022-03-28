import React, { useState } from "react";
import "./nav.css";

import { LogoIcon } from "../Icons/logo";
import { HomeIcon } from "../Icons/home";
import { MovieIcon } from "../Icons/movie";
import { TVSeriesIcon } from "../Icons/tv-series";
import { BookmarkOutlineIcon } from "../Icons/bookmark-outline";
import { BookmarkIcon } from "../Icons/bookmark";

import { Avatar } from "../Avatar/avatar";
import avatar from "../../assets/image-avatar.png";

import { Link } from "react-router-dom";

export function Nav({ bookmarked }) {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <header className="masthead">
      <LogoIcon className="logo"></LogoIcon>
      <nav className="primary-navigation">
        <Link
          to="/"
          onClick={() => {
            setCurrentPage(0);
          }}
          className={currentPage === 0 ? "active" : ""}
        >
          <HomeIcon></HomeIcon>
        </Link>
        <Link
          to="/movies"
          onClick={() => {
            setCurrentPage(1);
          }}
          className={currentPage === 1 ? "active" : ""}
        >
          <MovieIcon></MovieIcon>
        </Link>
        <Link
          to="/tv-series"
          onClick={() => {
            setCurrentPage(2);
          }}
          className={currentPage === 2 ? "active" : ""}
        >
          <TVSeriesIcon></TVSeriesIcon>
        </Link>
        {bookmarked != "" && (
          <Link
            to="/bookmarked"
            onClick={() => {
              setCurrentPage(3);
            }}
            className={currentPage === 3 ? "active" : ""}
          >
            {currentPage === 3 ? <BookmarkIcon></BookmarkIcon> : <BookmarkOutlineIcon></BookmarkOutlineIcon>}
          </Link>
        )}
      </nav>
      <Avatar src={avatar}></Avatar>
    </header>
  );
}
