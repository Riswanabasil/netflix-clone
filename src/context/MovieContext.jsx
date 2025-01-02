import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState({}); 

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDRjZWY1MDlhNGM3ZjZiZTllY2I4NDNjYmVkY2E5NiIsIm5iZiI6MTczNDMzNjI3MC45NTIsInN1YiI6IjY3NWZkZjBlZTMzNjBjNDNiNmJlYWE4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SQAPJru9sR2_soKBimHKWeaPnEvcMR16zPoNE239NXA', // Replace with your Bearer token
    },
  };

  const fetchMoviesByCategory = async (category) => {
    if (movies[category]) {
      return; 
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setMovies((prev) => ({ ...prev, [category]: data.results }));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <MovieContext.Provider value={{ movies, fetchMoviesByCategory }}>
      {children}
    </MovieContext.Provider>
  );
};


export const useMovies = () => useContext(MovieContext);
