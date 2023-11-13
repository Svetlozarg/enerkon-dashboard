import React, { useState } from 'react';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
  Box,
  CircularProgress
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { signInUser } from '@/store/slices/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setEmailError('');
    setPasswordError('');

    if (email === '' || password === '') {
      if (email === '') setEmailError('Моля въведете имайл адрес');
      if (password === '') setPasswordError('Моля въведете парола');
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Невалиден имейл адрес');
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Паролата трябва да съдържа поне 6 символа с една главна буква и един специален символ.'
      );
      return;
    }

    setLoading(true);
    try {
      await dispatch(signInUser(email, password) as any);
      setLoading(false);
    } catch (error) {
      console.error('Sign-in error:', error);
    } finally {
      setLoading(false);
    }
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
          Вход
        </Typography>
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

        {!loading ? (
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              style={{ marginTop: '20px', marginBottom: '15px' }}
              onClick={handleSubmit}
            >
              Вход
            </Button>
            <Typography>
              Нямате акаунт?{' '}
              <Link href="/auth/register" underline="none">
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

export default Login;
