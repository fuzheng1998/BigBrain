import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// import components
import QuestionCard from '../components/playgame/QuestionCard';
import ChoicesCard from '../components/playgame/ChoicesCard';

function PlayGame () {
    return (
        <Container maxWidth="lg">
            <CssBaseline />
            <QuestionCard />
            <ChoicesCard />
        </Container>
    );
  }


  export default PlayGame;