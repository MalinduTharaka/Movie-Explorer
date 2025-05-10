import { createContext, useState, useEffect } from 'react';
export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [lastSearch, setLastSearch] = useState(() => localStorage.getItem('lastSearch') || '');

  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('lastSearch', lastSearch); }, [lastSearch]);

  return (
    <MovieContext.Provider value={{ favorites, setFavorites, lastSearch, setLastSearch }}>
      {children}
    </MovieContext.Provider>
  );
}