import React, { useState } from 'react';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Link
} from '@mui/material';
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
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      if (username === '') setEmailError('Моля въведете потребителско име');
      if (email === '') setEmailError('Моля въведете имайл адрес');
      if (password === '') setPasswordError('Моля въведете парола');
      if (confirmPassword === '')
        setPasswordError('Моля въведете потвърждение на парола');
      return;
    }

    if (!usernameRegex.test(username)) {
      setUsernameError('Потребителското име трябва да съдържа поне 6 символа');
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Невалиден имейл адрес');
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Паролата трябва да съдържа поне 6 символа с една главна буква и един специален символ (. _ -)'
      );
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Паролите не съвпадат');
      return;
    }

    setLoading(true);

    signUp(username, email, password).then(() => {
      setLoading(false);
    });
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
          Регистрация
        </Typography>
        <TextField
          label="Потребителско име"
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
          label="Имейл"
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
          label="Парола"
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
          label="Потвърждение на парола"
          type="password"
          fullWidth
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          margin="normal"
          error={Boolean(confirmPasswordError)}
          helperText={confirmPasswordError}
        />

        {!loading ? (
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              style={{ marginTop: '20px', marginBottom: '20px' }}
              onClick={handleSubmit}
            >
              Регистрация
            </Button>
            <Typography>
              Нямате акаунт?{' '}
              <Link href="/auth/login" underline="none">
                Регистрирай се тук
              </Link>
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              my: '1rem'
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Register;
