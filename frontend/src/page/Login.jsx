import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// import { createTheme, ThemeProvider } from '@mui/material/styles';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container maxWidth="sm">
              <CssBaseline />
        <Box
          sx={{
            my: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            py: 5,
            bgcolor: '#f0f0f0',
          }}
        >
          <Typography component="h1" variant="h3">
            LOGIN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width:0.7,
              mt: 1,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="success"
              sx={{ mt: 3, mb: 2, width: 0.8, fontSize: 24 }}
            >
              LOGIN
            </Button>

            <Link sx = {{mt:2}} href="#" variant="body2">
              Click Here to register
            </Link>
            <Link sx = {{mt:2}} href="#" variant="body2">
              Want to Join a game? Click Here
            </Link>
          </Box>
        </Box>
    </Container>
  );
}

export default Login;
