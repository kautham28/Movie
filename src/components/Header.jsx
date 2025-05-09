import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  TextField, 
  InputAdornment,
  useTheme
} from '@mui/material';
import { 
  Home as HomeIcon, 
  Favorite as FavoriteIcon, 
  Brightness4 as Brightness4Icon, 
  Brightness7 as Brightness7Icon,
  Search as SearchIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Header = ({ toggleTheme, currentMode, onSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); 
  };

  const isDark = currentMode === 'dark';

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #2C3E50, #34495E)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
        borderRadius: '0 0 8px 8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              fontSize: '1.8rem',
              background: 'linear-gradient(90deg, #E74C3C, #F1C40F)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              cursor: 'pointer',
              textShadow: '0 2px 6px rgba(231, 76, 60, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onClick={() => navigate('/home')}
          >
            FilmFlow
          </Typography>
        </motion.div>
        <Box sx={{ flexGrow: 1, maxWidth: '500px', mx: '2rem' }}>
          <TextField
            variant="outlined"
            placeholder="Search movies..."
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#E74C3C',
                },
              },
              '& .MuiInputBase-input': {
                padding: '0.5rem',
                fontSize: '1rem',
              },
              transition: 'all 0.3s ease',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ 
                    color: '#FFFFFF',
                    opacity: 0.7 
                  }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              onClick={() => navigate('/home')}
              sx={{
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                },
                transition: 'background-color 0.3s',
              }}
            >
              <HomeIcon />
            </IconButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              onClick={() => navigate('/favorites')}
              sx={{
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                },
                transition: 'background-color 0.3s',
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                },
                transition: 'background-color 0.3s',
              }}
            >
              {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;