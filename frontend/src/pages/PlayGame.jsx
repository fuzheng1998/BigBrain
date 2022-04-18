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
import ResultCard from '../components/playgame/ResultCard'

export const PlayGameContext = React.createContext()

function PlayGame() {
  const [countDown, setCountDown] = React.useState(10);
  const [isEndOfGame, setIsEndOfGame] = React.useState(true);

  return (
    <PlayGameContext.Provider value={{ countDown, setCountDown }}>
      <Container 
        maxWidth="lg" 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
      >
        <CssBaseline />
        {
          isEndOfGame ? (
            <>
            <ResultCard />
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, width: 0.8, fontSize: 24 }}
            >
              BACK TO LOBBY
            </Button>
            </>
          ) : (
            <>
              <QuestionCard />
              <ChoicesCard />
            </>
        )}
      </Container>
    </PlayGameContext.Provider>
  );
}


export default PlayGame;