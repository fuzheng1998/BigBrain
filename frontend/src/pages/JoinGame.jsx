import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';




function JoinGame() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const loginFD = new FormData(event.currentTarget);
    let formDataObj = {};
    loginFD.forEach((value, key) => formDataObj[key] = value);

    console.log({
      formDataObj
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
          JOIN A GAME
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 0.7,
            mt: 1,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="sessionID"
            label="Session ID"
            name="sessionID"
            autoComplete="sessionID"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="playername"
            label="Player name"
            id="playername"
            autoComplete="playername"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="success"
            sx={{ mt: 3, mb: 2, width: 0.8, fontSize: 24 }}
          >
            JOIN
          </Button>

          <Link sx={{ mt: 2 }} href="#" variant="body2">
            Are you an admin? Login here.
          </Link>
          <Link sx={{ mt: 2 }} href="#" variant="body2">
            Or register here to become an admin.
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default JoinGame;
