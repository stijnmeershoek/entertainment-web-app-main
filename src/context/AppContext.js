import React, { createContext, useContext, useEffect, useState } from "react";
import { LoadingScreen } from "../pages/Loading";

const AppContext = createContext();

export function useAppState() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [reverse, setReverse] = useState(false);

  const reverseDirection = (bool) => {
    setReverse(bool);
  };

  const addBookmark = (id, type, title) => {
    if (bookmarks.some((bookmark) => bookmark.id === id && bookmark.type === type)) return;
    setBookmarks((bookmarks) => [...bookmarks, { id: id, type: type, title: title }]);
  };

  const removeBookmark = (id, type) => {
    setBookmarks((bookmarks) =>
      bookmarks.filter((bookmark) => {
        return bookmark.id !== id && bookmark.type !== type;
      })
    );
  };

  useEffect(() => {
    async function fetchTrending() {
      setLoading(true);
      const data = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=c91380e87602d7394898bced749c5ef8`);
      const trending = await data.json();
      setTrending(trending.results);
      setLoading(false);
    }
    fetchTrending();
  }, []);

  return <AppContext.Provider value={{ trending, bookmarks, addBookmark, removeBookmark, reverse, reverseDirection }}>{loading ? <LoadingScreen></LoadingScreen> : children}</AppContext.Provider>;
}
