import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Link as RouterLink } from 'react-router-dom';

import { AUTH } from '../config';


// referenced from here:
// https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
function isValidateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Tool function for registerAsUser()
// Checks if the register data is valid before sending to backend
function validateRegisterData(registerDataJson) {
  return new Promise((resolve, reject) => {
    const formDataObj = JSON.parse(registerDataJson);
    if (!isValidateEmail(formDataObj["email"])) {
      throw Error(`Not a valid email`);
    }

    resolve(registerDataJson);
  })
}

// Calls AUTH.REGISTER_URL to register
// @param {Json} registerDataJson
// @returns {Promise.Json} response body from register request
function requestRegisterAsUser(registerDataJson) {
  const registerRequest = new Request(AUTH.REGISTER_URL,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: registerDataJson
    });

  console.log(registerRequest);

  return fetch(registerRequest)
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
      return responseObj;
    })
    .catch((error) => {
      console.error('function requestRegisterAsUser fetch failed', error);
      throw error;
    });

}

function registerAsUser(formDataObj) {
  //Convert object to json
  let registerDataJson = "";
  registerDataJson = JSON.stringify(formDataObj);
  console.log(registerDataJson)


  return validateRegisterData(registerDataJson)
    .then(registerDataJson => requestRegisterAsUser(registerDataJson))
    .then(responseObj => {
      alert("Register success!");
      return responseObj;
    }).catch(error => {
      console.error('function registerAsUser failed', error);
      alert(error);
      throw error;
    });
}

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const registerFD = new FormData(event.currentTarget);
    let formDataObj = {};
    registerFD.forEach((value, key) => formDataObj[key] = value);

    console.log({
      formDataObj
    });

    registerAsUser(formDataObj).then(responseObj => {
      // TODO: Use global variable
      const CUR_USER_TOKEN = responseObj["token"];
      console.log(CUR_USER_TOKEN);
    }).catch((error) => {
      console.error('Register failed', error);
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
          REGISTER
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
            name="name"
            label="Name"
            type="text"
            id="name"
            autoComplete="name"
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
            sx={{ mt: 3, mb: 2, width: 0.8, fontSize: 24 }}
          >
            REGISTER
          </Button>

          <Link component={RouterLink} to="/login" sx={{ mt: 2 }} variant="body2">
            Have an account? Back to login page
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
