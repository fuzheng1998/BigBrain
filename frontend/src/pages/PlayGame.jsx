import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { useNavigate, Link as RouterLink } from 'react-router-dom';

// import components
import QuestionCard from '../components/playgame/QuestionCard';
import ChoicesCard from '../components/playgame/ChoicesCard';
import ResultCard from '../components/playgame/ResultCard'
import LobbyCard from '../components/playgame/LobbyCard';

// import urls
import { PLAYER } from '../config.js';
// import { TrafficRounded } from '@mui/icons-material';

export const PlayGameContext = React.createContext()

// Calls PLAYER.STATUS_URL to check status
// @param {} playerId
// @returns {Promise.Json} response body from game status request
function requestGameStatus (playerId) {
  const statusRequest = new Request(PLAYER.STATUS_URL(playerId),
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: undefined
    });

  // console.log(statusRequest);

  return fetch(statusRequest)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(errorJson => {
          throw Error(`${response.status} ${response.statusText} [${errorJson.error}]`);
        });
      }
    })
    .then(responseObj => {
      return responseObj;
    })
    .catch((error) => {
      // console.error('function requestGameStatus fetch failed', error);
      throw error;
    });
}

// Calls PLAYER.QUESTION_URL to get current question
// @param {} playerId
// @returns {Promise.Json} response body from game question request
function requestGameQuestion (playerId) {
  const statusRequest = new Request(PLAYER.QUESTION_URL(playerId),
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: undefined
    });

  return fetch(statusRequest)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(errorJson => {
          throw Error(`${response.status} ${response.statusText} [${errorJson.error}]`);
        });
      }
    })
    .then(responseObj => {
      return responseObj.question;
    })
    .catch((error) => {
      throw error;
    });
}

// Fetch game status and update corresponding states
// @param {} playerId, getter setters for states
// @returns nothing
function updateGameStatus (playerId, isGameStart, setIsGameStart, isEndOfGame, setIsEndOfGame, navigate) {
  // set states
  return requestGameStatus(playerId)
    .then(responseObj => {
      setIsGameStart(responseObj.started);
      return true;
    }).catch(error => {
      if (isGameStart) {
        setIsEndOfGame(true);
        return true;
      } else {
        console.error('function checkGameStatus failed', error);

        // navigate('/');
        // alert(error);
        // throw(error);
        return false;
      }
    });
}

//
function updateGameQuestion (playerId, setCurrentQuestion, setCountDown) {
  // set states
  return requestGameQuestion(playerId)
    .then(questionObj => {
      // Question is updated every time even if it's the same
      // Reset timer
      setCurrentQuestion(questionObj);
      const timeLatency = Math.ceil((Date.now() - Date.parse(questionObj.isoTimeLastQuestionStarted)) / 1000);
      const remainingTime = Math.max(questionObj.time - timeLatency, -1);
      setCountDown(remainingTime);
      console.log(remainingTime);
    }).catch(error => {
      console.info('function requestGameQuestion failed', error);
      // alert(error);
      // throw(error);
    });
}

function PlayGame () {
  const [countDown, setCountDown] = React.useState(-1);

  // before start: false,false
  // during game: true,false
  // end game: true,true
  const [isGameStart, setIsGameStart] = React.useState(false);
  const [isEndOfGame, setIsEndOfGame] = React.useState(false);

  // const [pollIntervalId, setPollIntervalId] = React.useState(null);
  // const [questionIntervalId, setQuestionIntervalId] = React.useState(null);

  const [currentQuestion, setCurrentQuestion] = React.useState(null);

  const navigate = useNavigate();

  const playerId = localStorage.getItem('PLAYER_ID')

  // Poll game status continuously
  // Poll game question continuously
  //      :This is to prevent the question being advanced before the timer is up
  React.useEffect(() => {
    // perform initial check and abort if not valid
    // can't async
    let pollInterval, questionInterval;
    if (!isEndOfGame) {
      pollInterval = setInterval(() => updateGameStatus(playerId, isGameStart, setIsGameStart, isEndOfGame, setIsEndOfGame, navigate), 1000);
      questionInterval = setInterval(() => updateGameQuestion(playerId, setCurrentQuestion, setCountDown), 1000);
      // setPollIntervalId(pollInterval);
      // setQuestionIntervalId(questionInterval);

      return () => {
        clearInterval(pollInterval);
        clearInterval(questionInterval);
        console.log('Cleaning up!', pollInterval, questionInterval);
        // setPollIntervalId(null);
        // setQuestionIntervalId(null);
      };
    }
  }, [isGameStart, isEndOfGame]);

  return (
    <PlayGameContext.Provider value={{ countDown, setCountDown }}>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CssBaseline />
        {
          isGameStart
            ? (
                isEndOfGame
                  ? (
              <>
                <ResultCard />
                <Button
                  component={RouterLink}
                  to='/player/join'
                  variant='contained'
                  size='large'
                  sx={{ mt: 3, mb: 2, width: 0.8, fontSize: 24 }}
                >
                  JOIN A NEW GAME
                </Button>
              </>
                    )
                  : (
              <>
                <QuestionCard questionObj={currentQuestion} />
                <ChoicesCard questionObj={currentQuestion} countDown={countDown} />
              </>
                    )

              )
            : (
            <LobbyCard />
              )
        }

      </Container>
    </PlayGameContext.Provider>
  );
}

export default PlayGame;
