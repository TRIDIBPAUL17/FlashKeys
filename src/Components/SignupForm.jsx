import { Box, Button, TextField, InputAdornment, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';
import errorMapping from '../Utils/errorMapping';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignupForm = ({ handleClose }) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [username, setUsername] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const { setAlert } = useAlert();
const { theme } = useTheme();

const checkUsernameAvailability = async () => {
    const ref = db.collection('usernames');
    const response = await ref.doc(username).get();
    return !response.exists;
};

const handleSubmit = async () => {
    if (!email || !password || !confirmPassword || !username) {
    setAlert({
        open: true,
        type: 'warning',
        message: 'fill all details'
    });
    return;
    }
    if (password !== confirmPassword) {
    setAlert({
        open: true,
        type: 'warning',
        message: 'Password Mismatch'
    });
    return;
    }

    if (await checkUsernameAvailability()) {
    auth.createUserWithEmailAndPassword(email, password).then(async (response) => {
        await db.collection('usernames').doc(username).set({
        uid: response.user.uid
        });
        setAlert({
        open: true,
        type: 'success',
        message: 'account created!'
        });
        handleClose();
    }).catch((err) => {
        setAlert({
        open: true,
        type: 'error',
        message: errorMapping[err.code] || 'Some error occurred'
        });
    });
    } else {
    setAlert({
        open: true,
        type: 'warning',
        message: 'username taken'
    });
    }
};

return (
    <Box
    p={3}
    style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    }}
    >
    <TextField
        type="text"
        variant="outlined"
        label="Enter Username"
        InputLabelProps={{
        style: {
            color: theme.title
        }
        }}
        InputProps={{
        style: {
            color: theme.title
        }
        }}
        onChange={(e) => setUsername(e.target.value)}
    />
    <TextField
        type="email"
        variant="outlined"
        label="Enter Email"
        InputLabelProps={{
        style: {
            color: theme.title
        }
        }}
        InputProps={{
        style: {
            color: theme.title
        }
        }}
        onChange={(e) => setEmail(e.target.value)}
    />
    <TextField
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        label="Enter Password"
        InputLabelProps={{
        style: {
            color: theme.title
        }
        }}
        InputProps={{
        style: {
            color: theme.title
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
        )
        }}
        onChange={(e) => setPassword(e.target.value)}
    />
    <TextField
        type={showConfirmPassword ? 'text' : 'password'}
        variant="outlined"
        label="Enter Confirm Password"
        InputLabelProps={{
        style: {
            color: theme.title
        }
        }}
        InputProps={{
        style: {
            color: theme.title
        },
        endAdornment: (
            <InputAdornment position="end">
            <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
                style={{ color: theme.title }}
            >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            </InputAdornment>
        )
        }}
        onChange={(e) => setConfirmPassword(e.target.value)}
    />
    <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: theme.title, color: theme.background }}
        onClick={handleSubmit}
    >
        Signup
    </Button>
    </Box>
);
};

export default SignupForm;
