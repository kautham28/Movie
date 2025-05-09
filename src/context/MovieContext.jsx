import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [lastSearchedMovie, setLastSearchedMovie] = useState(() => {
    const savedSearch = localStorage.getItem('lastSearchedMovie');
    return savedSearch ? JSON.parse(savedSearch) : null;
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (lastSearchedMovie) {
      localStorage.setItem('lastSearchedMovie', JSON.stringify(lastSearchedMovie));
    }
  }, [lastSearchedMovie]);

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter((fav) => fav.id !== movieId));
  };

  const updateLastSearchedMovie = (movie) => {
    setLastSearchedMovie(movie);
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        lastSearchedMovie,
        updateLastSearchedMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};