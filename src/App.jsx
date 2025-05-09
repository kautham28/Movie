import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import getTheme from './theme';
import { MovieProvider } from './context/MovieContext';

import Login from './pages/Login';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MoviePage from './pages/MoviePage';
import Header from './components/Header';

function App() {
  // Use localStorage to persist theme preference
  const savedMode = localStorage.getItem('themeMode') || 'dark';
  const [mode, setMode] = useState(savedMode);
  const [searchQuery, setSearchQuery] = useState('');

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Force re-render when theme changes to ensure all components update
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <MovieProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={
                localStorage.getItem('username') ? (
                  <>
                    <Header toggleTheme={toggleTheme} currentMode={mode} onSearch={handleSearch} />
                    <Home searchQuery={searchQuery} />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/movie/:id"
              element={
                localStorage.getItem('username') ? (
                  <>
                    <Header toggleTheme={toggleTheme} currentMode={mode} onSearch={handleSearch} />
                    <MoviePage />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/favorites"
              element={
                localStorage.getItem('username') ? (
                  <>
                    <Header toggleTheme={toggleTheme} currentMode={mode} onSearch={handleSearch} />
                    <Favorites />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </MovieProvider>
  );
}

export default App;