import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

function ResultItem ({ questionObj, index }) {
  const bgcolor = questionObj.correct ? '#84cc5a' : '#cc627b';
  return (
    <Box
      key={index}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        // alignContent: 'stretch',
        borderRadius: 2,
        border: 1,
        p: 1,
        bgcolor: bgcolor,
      }}
    >
      <Typography component='h1' variant='h3'>
        {index}. Took: {(Date.parse(questionObj.answeredAt) - Date.parse(questionObj.questionStartedAt)) / 1000} sec
      </Typography>
    </Box>
  );
}

ResultItem.propTypes = {
  questionObj: PropTypes.object,
  index: PropTypes.number
};

export default ResultItem;
