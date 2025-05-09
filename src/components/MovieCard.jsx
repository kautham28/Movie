import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ margin: 0 }} 
      >
        <Box
          sx={{
            backgroundColor: '#2C3E50',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            cursor: 'pointer',
            height: '300px', 
            width: '200px', 
            display: 'flex',
            flexDirection: 'column',
            margin: 0, 
          }}
        >
          <Box sx={{ position: 'relative', flex: '0 0 75%' }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px 12px 0 0',
              }}
            />
            {}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(44, 62, 80, 0.8), transparent)',
                zIndex: 1,
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              padding: '0.5rem',
              color: '#FFFFFF',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '1rem', 
              letterSpacing: '0.5px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              lineHeight: 1.3,
              zIndex: 2,
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {movie.title}
          </Typography>
        </Box>
      </motion.div>
    </Link>
  );
};

export default MovieCard;