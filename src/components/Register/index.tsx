import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { signUp } from '@/services/auth';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[._-])[A-Za-z0-9._-]{6,}$/;
  const usernameRegex = /^[A-Za-z0-9._-]{6,}$/; // Minimum 6 characters for the username

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!usernameRegex.test(username)) {
      setUsernameError('Username must be at least 6 characters');
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters with one uppercase letter and one special character (._-)');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    signUp(username, email, password)
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
          Register
        </Typography>
        <TextField
          label="Username"
          type="text"
          fullWidth
          required
          value={username}
          onChange={handleUsernameChange}
          margin="normal"
          error={Boolean(usernameError)}
          helperText={usernameError}
        />
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
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          margin="normal"
          error={Boolean(confirmPasswordError)}
          helperText={confirmPasswordError}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          style={{ marginTop: '20px' }}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
