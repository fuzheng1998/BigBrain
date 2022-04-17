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

function QuestionCard() {
    return (
        <Box
            sx={{
                my: 8,
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
            <MediaDisplay mediaType="video" youtubeCode="ojeCfN6MGCI" />
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Typography component="h1" variant="h3">
                        Question is displayed here
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <TimerWidget />
                </Grid>
            </Grid>


        </Box>
    );
}


export default QuestionCard;