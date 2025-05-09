import React, { useContext } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites } = useContext(MovieContext);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        height: '100vh',
        width: '100vw',
        padding: 0,
        color: theme.palette.text.primary,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <Box sx={{ padding: '1.5rem', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: '3rem',
              fontWeight: 900,
              marginBottom: '1rem',
              background: isDark
                ? 'linear-gradient(90deg, #E74C3C, #F1C40F)'
                : 'linear-gradient(90deg, #D35400, #E67E22)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: isDark
                ? '0 4px 10px rgba(231, 76, 60, 0.5)'
                : '0 4px 10px rgba(211, 84, 0, 0.3)',
              position: 'relative',
              zIndex: 2,
              transition: 'all 0.3s ease',
            }}
          >
            Your Favorites
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <Typography
            variant="body1"
            sx={{
              color: isDark ? '#BDC3C7' : '#5D6D7E',
              marginBottom: '2rem',
              fontSize: '1.2rem',
              fontStyle: 'italic',
              opacity: 0.9,
              textShadow: isDark
                ? '0 2px 6px rgba(0, 0, 0, 0.3)'
                : 'none',
              transition: 'color 0.3s ease, text-shadow 0.3s ease',
            }}
          >
            {favorites.length === 0
              ? 'No favorites yet.'
              : `${favorites.length} movie${favorites.length > 1 ? 's' : ''} saved to your collection`}
          </Typography>
        </motion.div>
      </Box>
      <Box sx={{ flex: 1, padding: '1.5rem' }}>
        {favorites.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '0', 
            }}
          >
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '50vh',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: 'center',
                maxWidth: '600px',
                mb: 2,
              }}
            >
              You haven't added any favorites yet
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: 'center',
                maxWidth: '600px',
              }}
            >
              Browse movies and click the heart icon to add them to your favorites
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Favorites;