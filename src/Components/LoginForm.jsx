import { Box, Button, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';
import errorMapping from '../Utils/errorMapping';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setAlert } = useAlert();
  const { theme } = useTheme();

  const handleSubmit = () => {
    if (!email || !password) {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Please fill in all details.',
      });
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setAlert({
          open: true,
          type: 'success',
          message: 'Logged in successfully.',
        });
        handleClose();
      })
      .catch((err) => {
        console.log('Error', err);
        setAlert({
          open: true,
          type: 'error',
          message: errorMapping[err.code] || 'Some error occurred',
        });
      });
  };

  return (
    <Box
      p={3}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <TextField
        type="email"
        variant="outlined"
        label="Enter Email"
        fullWidth
        InputLabelProps={{
          style: {
            color: theme.title,
          },
        }}
        InputProps={{
          style: {
            color: theme.title,
          },
        }}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        label="Enter Password"
        fullWidth
        InputLabelProps={{
          style: {
            color: theme.title,
          },
        }}
        InputProps={{
          style: {
            color: theme.title,
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                style={{ color: theme.title }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        size="large"
        fullWidth
        style={{
          backgroundColor: theme.title,
          color: theme.background,
        }}
        onClick={handleSubmit}
      >
        LOGIN
      </Button>
    </Box>
  );
};

export default LoginForm;
