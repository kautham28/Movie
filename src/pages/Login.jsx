import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2C3E50',
  padding: '2rem',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.mode === 'light' ? '#E0E0E0' : '#34495E',
    color: theme.palette.text.primary,
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.text.secondary,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.text.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  marginBottom: '1.5rem',
}));

const StyledButton = styled(Button)({
  backgroundColor: '#E74C3C',
  color: '#FFFFFF',
  padding: '0.75rem',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#C0392B',
  },
});

const Logo = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '1rem',
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem('username', username);
      navigate('/home');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh', 
        width: '100vw',  
        backgroundColor: (theme) => theme.palette.background.default,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        overflow: 'auto', 
      }}
    >
      <StyledCard>
        <Logo>
          <span style={{ color: '#E74C3C' }}>Film</span>
          <span style={{ color: (theme) => theme.palette.text.primary }}>Flow</span>
        </Logo>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ textAlign: 'center', marginBottom: '2rem', color: (theme) => theme.palette.text.secondary }}
        >
          Enter your credentials to access your account
        </Typography>
        <StyledTextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="johndoe"
        />
        <StyledTextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton
          fullWidth
          onClick={handleLogin}
        >
          Login
        </StyledButton>
      </StyledCard>
    </Box>
  );
};

export default Login;