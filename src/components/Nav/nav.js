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
import { useAppState } from "../../context/AppContext";

export function Nav({ bookmarked }) {
  const [prevPage, setPrevPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { reverseDirection } = useAppState();

  return (
    <header className="masthead">
      <LogoIcon className="logo"></LogoIcon>
      <nav className="primary-navigation">
        <Link
          to="/"
          onClick={() => {
            if (prevPage > 0) reverseDirection(true);
            setCurrentPage(0);
            setPrevPage(0);
          }}
          className={currentPage === 0 ? "active" : ""}
        >
          <span className="visually-hidden">Home Page</span>
          <HomeIcon></HomeIcon>
        </Link>
        <Link
          to="/movies"
          onClick={() => {
            if (prevPage > 1) reverseDirection(true);
            if (prevPage < 1) reverseDirection(false);
            setCurrentPage(1);
            setPrevPage(1);
          }}
          className={currentPage === 1 ? "active" : ""}
        >
          <span className="visually-hidden">Movies Page</span>
          <MovieIcon></MovieIcon>
        </Link>
        <Link
          to="/tv-series"
          onClick={() => {
            if (prevPage > 2) reverseDirection(true);
            if (prevPage < 2) reverseDirection(false);
            setCurrentPage(2);
            setPrevPage(2);
          }}
          className={currentPage === 2 ? "active" : ""}
        >
          <span className="visually-hidden">TV Series Page</span>
          <TVSeriesIcon></TVSeriesIcon>
        </Link>
        {bookmarked && (
          <Link
            to="/bookmarks"
            onClick={() => {
              reverseDirection(false);
              setCurrentPage(3);
              setPrevPage(3);
            }}
            className={currentPage === 3 ? "active" : ""}
          >
            <span className="visually-hidden">Bookmarked Page</span>
            {currentPage === 3 ? <BookmarkIcon></BookmarkIcon> : <BookmarkOutlineIcon></BookmarkOutlineIcon>}
          </Link>
        )}
      </nav>
      <Avatar src={avatar}></Avatar>
    </header>
  );
}
