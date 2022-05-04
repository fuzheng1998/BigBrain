import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ResultItem from './ResultItem';

import { PLAYER } from '../../config.js'

// Calls PLAYER.RESULT_URL to check result
// @param {} playerId
// @returns {Promise.Json} response body from game result request
function requestGameResult (playerId) {
  const resultRequest = new Request(PLAYER.RESULTS_URL(playerId),
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: undefined
    });

  console.log(resultRequest);

  return fetch(resultRequest)
    .then(response => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        return response.json().then(errorJson => {
          throw Error(`${response.status} ${response.statusText} [${errorJson.error}]`);
        });
      }
    })
    .then(responseObj => {
      // console.log('requestLoginAsUser():'+ JSON.stringify(responseObj));
      console.log(responseObj);
      return responseObj;
    })
    .catch((error) => {
      console.error('function requestGameStatus fetch failed', error);
      return null;
      // throw error;
    });
}

function ResultCard () {
  const playerId = localStorage.getItem('PLAYER_ID')

  // const [questionResponseList, setQuestionResponseList] = React.useState([]);
  const [questionCardList, setQuestionCardList] = React.useState([]);

  useEffect(() => {
    requestGameResult(playerId)
      .then(responseList => {
        console.log('Got response list:', responseList);
        // setQuestionResponseList(responseList);
        setQuestionCardList(responseList.map((q, i) => { return <Grid item key={i} xs={12} sm={6}><ResultItem questionObj={q} index={i} /></Grid> }));
      })
  }, []);

  return (
    <Box
      sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        // alignContent: 'stretch',
        borderRadius: 2,
        p: 1,
        bgcolor: '#f0f0f0',
        minHeight: '60vh',
      }}
    >
      <Typography component='h1' variant='h3'>
        Player results!
      </Typography>
      <Grid container spacing={2} my={1}>
          {questionCardList}
      </Grid>
    </Box>
  );
}

export default ResultCard;
