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

function ResultItem({ questionObj , index }) {
  const bgcolor = questionObj["correct"] ? '#84cc5a' : '#cc627b';
  return (
    <Box
      key = {index}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        // alignContent: 'stretch',
        borderRadius: 2,
        border:1,
        p: 1,
        bgcolor: bgcolor,
      }}
    >
      <Typography component="h1" variant="h3">
        {index}. Took: {(Date.parse(questionObj["answeredAt"]) - Date.parse(questionObj["questionStartedAt"]))/1000} sec
      </Typography>
    </Box>
  );
}


export default ResultItem;