import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import MediaDisplay from './MediaDisplay.jsx'

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
                py: 5,
                bgcolor: '#f0f0f0',
                minHeight: '50vh',
            }}
        >
            <MediaDisplay mediaType="video" youtubeCode="ojeCfN6MGCI" />
            <Typography component="h1" variant="h3">
                Question is displayed here
            </Typography>

        </Box>
    );
}


export default QuestionCard;