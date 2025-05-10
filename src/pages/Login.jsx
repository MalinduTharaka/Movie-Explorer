// src/pages/Login.jsx
import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // hard-coded check
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('loggedIn', 'true');
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 300,
        mx: 'auto',
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Username"
        value={username}
        onChange={(e) => {
          setError('');
          setUsername(e.target.value);
        }}
        fullWidth
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setError('');
          setPassword(e.target.value);
        }}
        fullWidth
      />

      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}
