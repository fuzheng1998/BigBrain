import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MediaDisplay from './MediaDisplay.jsx'

function LobbyCard () {
  return (
    <>
      <Typography component='h1' variant='h3'>
        Waiting for the game to start...
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          borderRadius: 2,
          p: 1,
          bgcolor: '#f0f0f0',
          minHeight: '80vh',
          width: '100%',
        }}
      >
        <MediaDisplay mediaType='video' youtubeCode='EiKK04Ht8QI' />
      </Box>
    </>
  );
}

export default LobbyCard;
