import React, {useContext} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import {userContext} from "../App";
import {useNavigate} from "react-router-dom"

import { Link as RouterLink } from 'react-router-dom';

import { AUTH } from '../config';

// Calls AUTH.LOGIN_URL to login
// @param {Json} loginDataJson
// @returns {Promise.Json} response body from login request
function requestLoginAsUser(loginDataJson) {
  const loginRequest = new Request(AUTH.LOGIN_URL,
      {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: loginDataJson
      });

  console.log(loginRequest);

  return fetch(loginRequest)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              return response.json().then(errorJson => {
                  throw Error(`${response.status} ${response.statusText} [${errorJson["error"]}]`);
              });
          }
      })
      .then(responseObj => {
          // console.log("requestLoginAsUser():"+ JSON.stringify(responseObj));
          return responseObj;
      })
      .catch((error) => {
          console.error('function requestLoginAsUser fetch failed', error);
          throw error;
      });

}

// Perform actions for login
// @param {Object} formDataObj
// @returns {Promise.Object} response body from login request
function loginAsUser(formDataObj) {
  //Convert object to json
  let loginDataJson = "";
  loginDataJson = JSON.stringify(formDataObj);

  return requestLoginAsUser(loginDataJson)
      .then(responseObj => {
          return responseObj;
      }).catch(error => {
          console.error('function loginAsUser failed', error);
          throw(error);
      });
}

function Login() {
    const [, setUserToken] = useContext(userContext);
    let navigate = useNavigate();
    const handleSubmit = (event) => {
    event.preventDefault();
    const loginFD = new FormData(event.currentTarget);
    let formDataObj = {};
    loginFD.forEach((value, key) => formDataObj[key] = value);

    console.log({
      formDataObj
    });
    loginAsUser(formDataObj).then(responseObj => {
      const CUR_USER_TOKEN = responseObj["token"];
      console.log(CUR_USER_TOKEN);
      setUserToken(CUR_USER_TOKEN);
      localStorage.setItem('auth_token', CUR_USER_TOKEN);
      navigate('../admin/dashboard');
    }).catch((error) => {
      console.error('Login failed', error);
      alert(error);
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
            width: 0.7,
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

          <Link component={RouterLink} to="/register" sx={{ mt: 2 }} variant="body2">
            Click Here to register
          </Link>
          <Link component={RouterLink} to="/player/join" sx={{ mt: 2 }} variant="body2">
            Want to Join a game? Click Here
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
