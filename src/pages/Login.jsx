import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Username" />
      <TextField label="Password" type="password" />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  );
}