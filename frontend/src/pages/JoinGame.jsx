import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { PLAYER } from '../config.js';

// Calls AUTH.JOIN_URL to join
// @param {Json} joinDataJson
// @returns {Promise.Json} response body from join request
function requestJoinAsUser (joinDataJson, sessionId) {
  console.log(joinDataJson);
  const joinRequest = new Request(PLAYER.JOIN_URL(sessionId),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: joinDataJson
    });

  console.log(joinRequest);

  return fetch(joinRequest)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(errorJson => {
          throw Error(`${response.status} ${response.statusText} [${errorJson.error}]`);
        });
      }
    })
    .then(responseObj => {
      return responseObj;
    })
    .catch((error) => {
      console.error('function requestJoinAsUser fetch failed', error);
      throw error;
    });
}

// Perform actions for join
// @param {Object} formDataObj
// @returns {Promise.Object} response body from join request
function JoinAsUser (formDataObj) {
  // Convert object to json
  let joinDataJson = '';
  joinDataJson = JSON.stringify({ name: formDataObj.playername });

  return requestJoinAsUser(joinDataJson, formDataObj.sessionID)
    .then(responseObj => {
      return responseObj;
    }).catch(error => {
      console.error('function joinAsUser failed', error);
      throw (error);
    });
}

function JoinGame () {
  // fine if sessionId is undefined
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const joinFD = new FormData(event.currentTarget);
    const formDataObj = {};
    joinFD.forEach((value, key) => { formDataObj[key] = value });

    console.log({ formDataObj });

    JoinAsUser(formDataObj).then(responseObj => {
      // receive player id and navigate to game page
      const PLAYER_ID = responseObj.playerId;
      localStorage.setItem('PLAYER_ID', PLAYER_ID)
      console.log(PLAYER_ID);
      navigate(`/player/play/${formDataObj.sessionID}`);
    }).catch((error) => {
      console.error('Join Game failed', error);
      alert(error);
    });
  };

  return (
    <Container maxWidth='sm'>
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
        <Typography component='h1' variant='h3'>
          JOIN A GAME
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 0.7,
            mt: 1,
          }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='sessionID'
            label='Session ID'
            name='sessionID'
            autoComplete='sessionID'
            autoFocus
            defaultValue={sessionId}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='playername'
            label='Player name'
            id='playername'
            autoComplete='playername'
          />
          <Button
            type='submit'
            variant='contained'
            size='large'
            color='success'
            sx={{ mt: 3, mb: 2, width: 0.8, fontSize: 24 }}
          >
            JOIN
          </Button>

          <Link component={RouterLink} to='/login' sx={{ mt: 2 }} variant='body2'>
            Are you an admin? Login here.
          </Link>
          <Link component={RouterLink} to='/register' sx={{ mt: 2 }} variant='body2'>
            Or register here to become an admin.
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default JoinGame;
