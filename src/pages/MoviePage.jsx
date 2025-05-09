import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { MovieContext } from '../context/MovieContext';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null); // State for YouTube trailer key
  const { addToFavorites, favorites } = useContext(MovieContext);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
        );
        setMovie(response.data);
        // Find the first trailer (type 'Trailer' and site 'YouTube')
        const trailer = response.data.videos.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        alert('Failed to load movie details. Please try again.');
      }
    };
    fetchMovieDetails();
  }, [id, API_KEY]);

  if (!movie) return (
    <Box sx={{
      backgroundColor: '#1C2526',
      minHeight: '100vh',
      width: '100vw',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Typography>Loading...</Typography>
    </Box>
  );

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const runtimeHours = Math.floor(movie.runtime / 60);
  const runtimeMinutes = movie.runtime % 60;

  return (
    <Box
      sx={{
        backgroundColor: '#1C2526',
        minHeight: '100vh',
        width: '100vw',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Backdrop Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          zIndex: 1,
        }}
      />
      {/* Overlay to enhance text readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'linear-gradient(to bottom, rgba(28, 37, 38, 0.6), rgba(28, 37, 38, 0.8))',
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '2.5rem',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '4rem 2rem 2rem 2rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flexShrink: 0, alignSelf: 'flex-start' }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: '100%',
                maxWidth: '340px',
                borderRadius: '16px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.8)',
                border: '2px solid rgba(255,255,255,0.1)',
              }}
            />
          </motion.div>
          <Box sx={{ flexGrow: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: '0.7rem',
                  lineHeight: 1.1,
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                }}
              >
                {movie.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontStyle: 'italic',
                  color: '#BDC3C7',
                  marginBottom: '1.5rem',
                  fontSize: '1.2rem',
                  opacity: 0.9,
                }}
              >
                "{movie.tagline}"
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}
            >
              <Typography sx={{ color: '#FFD700', fontWeight: 600, fontSize: '1.2rem' }}>
                ⭐ {movie.vote_average.toFixed(1)}/10 <span style={{ color: '#BDC3C7', fontWeight: 400 }}>({movie.vote_count.toLocaleString()} votes)</span>
              </Typography>
              <Typography sx={{ color: '#BDC3C7', fontSize: '1.1rem' }}>
                • {runtimeHours}h {runtimeMinutes}m
              </Typography>
              <Typography sx={{ color: '#BDC3C7', fontSize: '1.1rem' }}>
                • {new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}
            >
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{
                    backgroundColor: '#34495E',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    letterSpacing: '0.5px',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                />
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '0.7rem',
                  marginTop: '2rem',
                }}
              >
                Overview
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#BDC3C7',
                  marginBottom: '2rem',
                  fontSize: '1.15rem',
                  lineHeight: 1.8,
                  maxWidth: '750px',
                }}
              >
                {movie.overview}
              </Typography>
            </motion.div>
            {/* Trailer Section */}
            {trailerKey && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '1rem',
                  }}
                >
                  Trailer
                </Typography>
                <Box sx={{ maxWidth: '750px', mb: '2rem' }}>
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title={`${movie.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    }}
                  ></iframe>
                </Box>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button
                onClick={() => addToFavorites(movie)}
                disabled={isFavorite}
                sx={{
                  backgroundColor: '#E74C3C',
                  color: '#FFFFFF',
                  padding: '1rem 2.5rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(231,76,60,0.3)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    backgroundColor: '#C0392B',
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 16px rgba(231,76,60,0.5)',
                  },
                  '&:disabled': {
                    backgroundColor: '#7F8C8D',
                    color: '#FFFFFF',
                    boxShadow: 'none',
                  },
                }}
              >
                {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MoviePage;