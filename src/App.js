import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAppState } from "./context/AppContext";
import "./app.css";

import { Home } from "./pages/Home";
import { Bookmarked } from "./pages/Bookmarked";
import { Nav } from "./components/Nav";
import { Movies } from "./pages/Movies";
import { Shows } from "./pages/Shows";

export default function App() {
  const location = useLocation();
  const { bookmarks } = useAppState();

  return (
    <>
      <Nav bookmarked={bookmarks.length !== 0} />
      <main className="page-container">
        <AnimatePresence initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/tv-series" element={<Shows />}></Route>
            <Route path="/bookmarks" element={bookmarks.length !== 0 ? <Bookmarked /> : <Navigate to="/" />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}
