import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home";
import { Nav } from "./components/Nav";

export default function App() {
  const location = useLocation();
  const [reverse, setReverse] = useState(false);
  const [bookmarked, setBookmarked] = useState(["one"]);

  const props = {
    reverse: reverse,
    setReverse: setReverse,
  };

  return (
    <>
      <Nav bookmarked={bookmarked} />
      <AnimatePresence initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home {...props} />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
