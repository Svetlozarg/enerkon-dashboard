import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Typography, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signInUser } from '@/store/slices/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[._-])[A-Za-z0-9._-]{6,}$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setEmailError('');
    setPasswordError('');

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters with one uppercase letter and one special character (. _ -)');
      return;
    }
    dispatch(signInUser(email, password) as any);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh',
        width: '100%'
      }}
    >
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={handleEmailChange}
          margin="normal"
          error={Boolean(emailError)}
          helperText={emailError}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
          error={Boolean(passwordError)}
          helperText={passwordError}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          style={{ marginTop: '20px', marginBottom: '15px' }}
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Link href="/auth/register" underline="none">
          Register
        </Link>
      </Paper>
    </Container>
  );
};

export default Login;
