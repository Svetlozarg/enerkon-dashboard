import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
// import { signInUser} from '@/store/slices/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    // dispatch(signInUser(name, email, password) as any);
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
          type="username"
          fullWidth
          required
          value={username}
          onChange={handleUsernameChange}
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={handleEmailChange}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
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
