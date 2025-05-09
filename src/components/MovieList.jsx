import React from 'react';
import { Box } from '@mui/material';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.5rem',
        width: '100%', // Ensures full width
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
};

export default MovieList;