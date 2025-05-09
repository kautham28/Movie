import React, { useState, useContext } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';
import { MovieContext } from '../context/MovieContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { updateLastSearchedMovie } = useContext(MovieContext);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      );
      if (response.data.results.length > 0) {
        updateLastSearchedMovie(response.data.results[0]);
      } else {
        alert('No movies found.');
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      alert('Failed to search movies. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={handleKeyPress}
      placeholder="Search movies..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#BDC3C7' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#34495E',
          borderRadius: '4px',
          '& fieldset': { borderColor: '#BDC3C7' },
          '&:hover fieldset': { borderColor: '#FFFFFF' },
          '&.Mui-focused fieldset': { borderColor: '#E74C3C' },
        },
        '& .MuiInputBase-input': {
          color: '#FFFFFF',
          padding: '0.5rem',
        },
        '& .MuiInputLabel-root': {
          color: '#BDC3C7',
        },
      }}
    />
  );
};

export default SearchBar;
