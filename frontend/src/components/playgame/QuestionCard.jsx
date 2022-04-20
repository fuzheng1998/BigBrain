import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types'

import MediaDisplay from './MediaDisplay.jsx'
import TimerWidget from './TimerWidget.jsx'

function QuestionCard ({ questionObj }) {
  return (
    <Box
      sx={{
        my: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        // alignContent: 'stretch',
        borderRadius: 2,
        p: 1,
        bgcolor: '#f0f0f0',
        minHeight: '60vh',
        width: '100%'
      }}
    >
      {questionObj == null
        ? (
        <Typography component='h1' variant='h3'>
          Loading question...
        </Typography>
          )
        : (
        <>
          {questionObj.mediaType == null
            ? (
            <></>
              )
            : (
            <MediaDisplay mediaType={questionObj.mediaType} youtubeCode={questionObj.videoCode} image={questionObj.image} />
              )}
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography component='h1' variant='h3'>
                {questionObj.content}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <TimerWidget />
            </Grid>
          </Grid>
        </>
          )}

    </Box>
  );
}

QuestionCard.propTypes = {
  questionObj: PropTypes.object,
}

export default QuestionCard;
