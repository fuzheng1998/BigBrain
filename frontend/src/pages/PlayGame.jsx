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
import LobbyCard from '../components/playgame/LobbyCard';

export const PlayGameContext = React.createContext()

function PlayGame() {
  const [countDown, setCountDown] = React.useState(10);
  const [isGameStart, setIsGameStart] = React.useState(false);
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
          isGameStart ? ( 
            isEndOfGame ? (
              <>
              <ResultCard />
              <Button
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, width: 0.8, fontSize: 24 }}
              >
                JOIN A NEW GAME
              </Button>
              </>
            ) : (
              <>
                <QuestionCard />
                <ChoicesCard />
              </>
          )

          ):(
            <LobbyCard />
          )
        }
        
      </Container>
    </PlayGameContext.Provider>
  );
}


export default PlayGame;