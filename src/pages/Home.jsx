import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import MovieList from '../components/MovieList';

const Home = ({ searchQuery }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [visibleMovies, setVisibleMovies] = useState(10); 
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      if (!API_KEY) {
        alert('TMDB API Key is missing. Please check your .env file.');
        return;
      }
      try {
        const response = await axios.get(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );
        setTrendingMovies(response.data.results);
        setFilteredMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        alert('Failed to load trending movies. Please try again later.');
      }
    };
    fetchTrendingMovies();
  }, [API_KEY]);

  
  useEffect(() => {
    let updatedMovies = trendingMovies;

    if (genreFilter) {
      updatedMovies = updatedMovies.filter((movie) =>
        movie.genre_ids.includes(parseInt(genreFilter))
      );
    }
    if (yearFilter) {
      updatedMovies = updatedMovies.filter((movie) =>
        movie.release_date && new Date(movie.release_date).getFullYear() === parseInt(yearFilter)
      );
    }
    if (ratingFilter) {
      updatedMovies = updatedMovies.filter(
        (movie) => movie.vote_average >= parseInt(ratingFilter)
      );
    }
    if (searchQuery) {
      updatedMovies = updatedMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMovies(updatedMovies);
    setVisibleMovies(10); 
  }, [genreFilter, yearFilter, ratingFilter, searchQuery, trendingMovies]);

  
  const genres = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
  ];

  const years = [...new Set(trendingMovies.map((movie) =>
    movie.release_date ? new Date(movie.release_date).getFullYear() : null
  ).filter(year => year))].sort((a, b) => b - a);

  const ratings = [0, 2, 4, 6, 8, 10];

  const loadMore = () => {
    setVisibleMovies((prev) => prev + 10); 
  };

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
            {searchQuery ? 'Search Results' : 'Trending Movies'}
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
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : 'Discover the most popular movies right now'}
          </Typography>
        </motion.div>
        {}
        <Box sx={{ display: 'flex', gap: '1rem', mb: '2rem', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              label="Genre"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              label="Year"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              label="Rating"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {ratings.map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating}+
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ flex: 1, padding: '1.5rem' }}>
        {filteredMovies.length > 0 ? (
          <MovieList movies={filteredMovies.slice(0, visibleMovies)} />
        ) : (
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: theme.palette.text.secondary,
              marginTop: '2rem',
            }}
          >
            {searchQuery
              ? 'No movies found matching your search'
              : 'Loading movies...'}
          </Typography>
        )}
        {visibleMovies < filteredMovies.length && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '2rem' }}>
            <Button
              variant="contained"
              onClick={loadMore}
              sx={{
                backgroundColor: isDark ? '#E74C3C' : '#D35400',
                color: '#FFFFFF',
                padding: '0.75rem 2rem',
                fontWeight: 'bold',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  backgroundColor: isDark ? '#C0392B' : '#C0392B',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 16px rgba(231, 76, 60, 0.5)',
                },
              }}
            >
              Load More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;