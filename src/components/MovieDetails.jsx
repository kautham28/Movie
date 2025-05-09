import React, { useContext } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { MovieContext } from '../context/MovieContext';

const MovieDetails = ({ movie }) => {
  const { addToFavorites, favorites } = useContext(MovieContext);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const runtimeHours = Math.floor(movie.runtime / 60);
  const runtimeMinutes = movie.runtime % 60;

  return (
    <Box sx={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Box sx={{ flexShrink: 0 }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h1"
          sx={{ fontSize: '2rem', fontWeight: 700, color: '#E74C3C', marginBottom: '0.5rem' }}
        >
          {movie.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontStyle: 'italic', color: '#BDC3C7', marginBottom: '1rem' }}
        >
          "{movie.tagline}"
        </Typography>
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <Typography sx={{ color: '#FFD700' }}>
            ⭐ {movie.vote_average.toFixed(1)}/10 ({movie.vote_count.toLocaleString()} votes)
          </Typography>
          <Typography sx={{ color: '#BDC3C7' }}>
            • {runtimeHours}h {runtimeMinutes}m
          </Typography>
          <Typography sx={{ color: '#BDC3C7' }}>
            • {new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {movie.genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              sx={{
                backgroundColor: '#34495E',
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}
            />
          ))}
        </Box>
        <Typography
          variant="h2"
          sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#E74C3C', marginBottom: '0.5rem' }}
        >
          Overview
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#BDC3C7', marginBottom: '1rem' }}
        >
          {movie.overview}
        </Typography>
        <Button
          onClick={() => addToFavorites(movie)}
          disabled={isFavorite}
          sx={{
            backgroundColor: '#E74C3C',
            color: '#FFFFFF',
            padding: '0.75rem 1.5rem',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#C0392B' },
            '&:disabled': { backgroundColor: '#7F8C8D', color: '#FFFFFF' },
          }}
        >
          {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
        </Button>
      </Box>
    </Box>
  );
};

export default MovieDetails;