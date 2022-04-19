import React from 'react';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import ResultItem from './ResultItem';

function ResultCard() {
  const questionResponseList = [
    {
      "answerIds": [
        56513315
      ],
      "correct": true,
      "answeredAt": "2020-10-31T14:45:21.077Z",
      "questionStartedAt": "2020-10-31T14:45:21.077Z"
    },
    {
      "answerIds": [
        56513315
      ],
      "correct": false,
      "answeredAt": "2020-10-31T14:45:21.077Z",
      "questionStartedAt": "2020-10-31T14:45:10.077Z"
    },
    {
      "answerIds": [
        56513315
      ],
      "correct": true,
      "answeredAt": "2020-10-31T14:45:21.077Z",
      "questionStartedAt": "2020-10-31T14:45:21.077Z"
    }
  ]

  const questionCardList = questionResponseList.map((q,i) =>{ return <Grid item key={i} xs={12} sm={6}><ResultItem questionObj={q} index={i} /></Grid> });


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
      <Typography component="h1" variant="h3">
        Player results!
      </Typography>
      <Grid container spacing={2} my={1}>
          {questionCardList}
      </Grid>
      
      {/* <MediaDisplay mediaType="video" youtubeCode="ojeCfN6MGCI" />
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Typography component="h1" variant="h3">
                        Question is displayed here
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <TimerWidget />
                </Grid>
            </Grid> */}
    </Box>
  );
}


export default ResultCard;