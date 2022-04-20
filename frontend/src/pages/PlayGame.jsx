import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'

// import components
import QuestionCard from '../components/playgame/QuestionCard';
import ChoicesCard from '../components/playgame/ChoicesCard';
import ResultCard from '../components/playgame/ResultCard'
import LobbyCard from '../components/playgame/LobbyCard';

// import urls
import { PLAYER } from '../config.js';

export const PlayGameContext = React.createContext()

// Calls PLAYER.STATUS_URL to check status
// @param {} playerId
// @returns {Promise.Json} response body from game status request
function requestGameStatus(playerId) {
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
          throw Error(`${response.status} ${response.statusText} [${errorJson["error"]}]`);
        });
      }
    })
    .then(responseObj => {
      // console.log("requestLoginAsUser():"+ JSON.stringify(responseObj));
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
function requestGameQuestion(playerId) {
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
          throw Error(`${response.status} ${response.statusText} [${errorJson["error"]}]`);
        });
      }
    })
    .then(responseObj => {
      return responseObj["question"];
    })
    .catch((error) => {
      throw error;
    });

}


// Fetch game status and update corresponding states
// @param {} playerId, getter setters for states
// @returns nothing
function updateGameStatus(playerId, isGameStart, setIsGameStart, isEndOfGame, setIsEndOfGame, navigate) {
  console.log("polling");
  // set states
  return requestGameStatus(playerId)
    .then(responseObj => {
      setIsGameStart(responseObj["started"]);
      console.log(responseObj)
      return true;
    }).catch(error => {
      if (isGameStart) {
        setIsEndOfGame(true);
        return true;
      }
      else {
        console.error('function checkGameStatus failed', error);

        alert(error);
        navigate('/');
        // throw(error);
        return false;
      }
    });
}

// 
function updateGameQuestion(playerId, currentQuestion, setCurrentQuestion, setCountDown) {
  console.log("Update question");
  // set states
  return requestGameQuestion(playerId)
    .then(questionObj => {
      console.log(currentQuestion,questionObj["content"])
      if(currentQuestion==null||currentQuestion["content"]!==questionObj["content"]){
        // Found new question
        // Reset timer
        setCurrentQuestion(questionObj);
        const timeLatency = Math.ceil((Date.now() - Date.parse(questionObj["isoTimeLastQuestionStarted"]))/1000);
        const remainingTime = Math.max(questionObj["time"]-timeLatency,-1);
        setCountDown(remainingTime);
        console.log(remainingTime);
      }
    }).catch(error => {
        console.error('function requestGameQuestion failed', error);
        alert(error);
        // throw(error);
    });
}


function PlayGame() {
  const [countDown, setCountDown] = React.useState(10);

  // before start: false,false
  // during game: true,false
  // end game: true,true
  const [isGameStart, setIsGameStart] = React.useState(false);
  const [isEndOfGame, setIsEndOfGame] = React.useState(false);

  const [pollIntervalId, setPollIntervalId] = React.useState(null);
  const [questionIntervalId, setQuestionIntervalId] = React.useState(null);

  const [currentQuestion, setCurrentQuestion] = React.useState(null);

  const navigate = useNavigate();

  const playerId = localStorage.getItem('PLAYER_ID')

  // Poll game status continuously
  // Poll game question continuously
  //      :This is to prevent the question being advanced before the timer is up
  React.useEffect(async () => {
    // perform initial check and abort if not valid
    const initialCheck = await updateGameStatus(playerId, isGameStart, setIsGameStart, isEndOfGame, setIsEndOfGame, navigate)
    // let interval = null;
    if (initialCheck) {
      setPollIntervalId(setInterval(() => updateGameStatus(playerId, isGameStart, setIsGameStart, isEndOfGame, setIsEndOfGame, navigate), 1000));
      setQuestionIntervalId(setInterval(() => updateGameQuestion(playerId, currentQuestion, setCurrentQuestion, setCountDown), 1000));
    }
    return () => {
      clearInterval(pollIntervalId);
      clearInterval(questionIntervalId);
      setPollIntervalId(null);
      questionIntervalId(null);
    };
  }, []);


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
                <QuestionCard questionObj={currentQuestion}/>
                <ChoicesCard questionObj={currentQuestion}/>
              </>
            )

          ) : (
            <LobbyCard />
          )
        }

      </Container>
    </PlayGameContext.Provider>
  );
}


export default PlayGame;