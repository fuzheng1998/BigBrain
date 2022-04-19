import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import MediaDisplay from './MediaDisplay.jsx'
import TimerWidget from './TimerWidget.jsx'

function LobbyCard() {
    return (
        <>
        <Typography component="h1" variant="h3">
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
                width:'100%',
            }}
        >
            <MediaDisplay mediaType="video" youtubeCode="EiKK04Ht8QI" />
        </Box>
        </>
    );
}


export default LobbyCard;