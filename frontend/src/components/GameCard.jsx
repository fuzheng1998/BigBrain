import * as React from 'react';
import '@fontsource/roboto';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QUIZ } from '../config';

import PropTypes from 'prop-types';
// Calls QUIZ.START_URL to start game
// @param {Json} quizId , adminToken
// @returns {Promise.Json} response body from start game request (empty)
function requestGameStart (quizId, adminToken) {
  const startRequest = new Request(QUIZ.START_URL(quizId),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: adminToken
      },
      body: undefined
    });

  console.log(startRequest);

  return fetch(startRequest)
    .then(response => {
      console.log(response);
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
      console.error('function requestGameStart fetch failed', error);
      throw error;
    });
}

// Calls QUIZ.END_URL to end game
// @param {Json} quizId , adminToken
// @returns {Promise.Json} response body from end game request (empty)
function requestGameEnd (quizId, adminToken) {
  const endRequest = new Request(QUIZ.END_URL(quizId),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: adminToken
      },
      body: undefined
    });

  console.log(endRequest);

  return fetch(endRequest)
    .then(response => {
      console.log(response);
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
      console.error('function requestGameEnd fetch failed', error);
      throw error;
    });
}

// Calls QUIZ.ADVANCE_URL to advance to next game question
// @param {Json} quizId , adminToken
// @returns {Promise.Json} response body from end game request (empty)
function requestGameAdvance (quizId, adminToken) {
  const advanceRequest = new Request(QUIZ.ADVANCE_URL(quizId),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: adminToken
      },
      body: undefined
    });

  console.log(advanceRequest);

  return fetch(advanceRequest)
    .then(response => {
      console.log(response);
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
      console.error('function requestGameAdvance fetch failed', error);
      throw error;
    });
}

// Calls QUIZ.GET_SINGLE_URL to get game data
// @param {Json} quizId , adminToken
// @returns {Promise.Json} response body from get game data request
function requestGetGameInfo (quizId, adminToken) {
  const getGameRequest = new Request(QUIZ.GET_SINGLE_URL(quizId),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: adminToken
      },
      body: undefined
    });

  console.log(getGameRequest);

  return fetch(getGameRequest)
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
      console.error('function requestGetGameInfo fetch failed', error);
      throw error;
    });
}

// Call request for game start
function gameStartAsAdmin (quizId, adminToken) {
  return requestGameStart(quizId, adminToken)
    .then(responseObj => {
      return responseObj;
    }).catch(error => {
      console.error('function gameStartAsAdmin failed', error);
      alert(error);
      // throw (error);
    });
}

// Call request for game end
function gameEndAsAdmin (quizId, adminToken) {
  return requestGameEnd(quizId, adminToken)
    .then(responseObj => {
      return responseObj;
    }).catch(error => {
      console.error('function gameEndAsAdmin failed', error);
      alert(error);
      // throw (error);
    });
}

// Call request to start next question
function gameAdvanceAsAdmin (quizId, adminToken) {
  return requestGameAdvance(quizId, adminToken)
    .then(responseObj => {
      return responseObj;
    }).catch(error => {
      console.error('function gameAdvanceAsAdmin failed', error);
      alert(error);
      // throw (error);
    });
}

// Call request for game start
function getActiveSessionId (quizId, adminToken) {
  return requestGetGameInfo(quizId, adminToken)
    .then(responseObj => {
      console.log(responseObj);
      return responseObj.active;
    }).catch(error => {
      console.error('function getLatestSessionId failed', error);
      alert(error);
      // throw (error);
    });
}

GameCard.propTypes = {
  gameData: PropTypes.object,
};
function GameCard (props) {
  const gameData = props.gameData;
  const gameId = gameData.id;
  const adminToken = localStorage.getItem('auth_token');
  const navigate = useNavigate();

  const [gameState, setGameState] = React.useState(false);
  const [sessionDialogOpen, setSessionDialogOpen] = React.useState(false);
  const [stopDialogOpen, setStopDialogOpen] = React.useState(false);
  const [sessionId, setSessionId] = React.useState(null);

  // Check if game is active and set state
  getActiveSessionId(gameId, adminToken)
    .then(sId => { setGameState(sId !== null); });

  const handleSessionDialogClose = () => {
    setSessionDialogOpen(false);
  };
  const handleSessionDialogOpen = () => {
    setSessionDialogOpen(true);
  };
  const handleStopDialogClose = () => {
    setStopDialogOpen(false);
    navigate(`/results/${gameId}`);
  };
  const handleStopDialogOpen = () => {
    setStopDialogOpen(true);
  }

  const startHandler = async () => {
    setGameState(true);
    // Send start game request
    await gameStartAsAdmin(gameId, adminToken);
    // Get session Id
    const tempSessionId = await getActiveSessionId(gameId, adminToken);
    setSessionId(tempSessionId);
    //  dialog of game session
    handleSessionDialogOpen();
  }
  const stopHandler = () => {
    console.log('stop');
    setGameState(false);
    gameEndAsAdmin(gameId, adminToken);
    //  dialog of game stop
    handleStopDialogOpen();
    //  naviage to game page
  }
  const editHandler = () => {
    console.log('edit');
    navigate('../admin/edit/' + gameId, { state: { gameData: gameData } });
  }
  const deleteHandler = () => {
    console.log('delete game' + gameId);
    fetch(QUIZ.DELETE_URL + gameId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('auth_token')
      }
    }).catch(error => {
      console.log(error);
    });
    navigate(0);
    console.log(gameId + 'deleted');
  }

  // Advance to next question of this quiz
  const advanceHandler = () => {
    console.log('ADVANCE');
    gameAdvanceAsAdmin(gameId, adminToken);
  }

  const copySessionId = async () => {
    // const data = document.getElementById('sessionId');
    // todo generate new session link
    // const promise = navigator.clipboard.writeText(data.innerText);
    const currentOriginPath = window.location.origin;
    await navigator.clipboard.writeText(`${currentOriginPath}/player/join/${sessionId}`);
    // close copy prompt
    handleSessionDialogClose();
    // promise.then(function () {
    //   console.log('Async: Copying to clipboard was successful!');
    // }, function (err) {
    //   console.error('Async: Could not copy text: ', err);
    // });
    // console.log('Copied the text:');
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="{gameData.thumbnail}"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {gameData.name}
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Time limitation: 10s"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Quantity: {gameData.questions.length}"
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Button size="small" onClick={editHandler}>Edit</Button>
        {gameState === false
          ? <Button size="small" onClick={startHandler}>Start</Button>
          : <Button size="small" onClick={stopHandler}>Stop</Button>
        }
        <Button size="small" onClick={deleteHandler}>Delete</Button>
        {gameState === true
          ? <Button size="small" onClick={advanceHandler}>Next Question</Button>
          : <></>
        }
      </CardActions>
      <Dialog onClose={handleSessionDialogClose} open={sessionDialogOpen}>
        <DialogTitle>Session ID</DialogTitle>
        <DialogContent>
          <DialogContentText id="sessionId">
            Session id: {sessionId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleSessionDialogClose}>Disagree</Button> */}
          <Button onClick={copySessionId} autoFocus>
            Copy URL
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={stopDialogOpen} onClose={handleStopDialogClose}>
        <DialogTitle>Stop Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to view the results?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setStopDialogOpen(false);
            navigate('../admin/dashboard/');
          }} color="primary">
            No
          </Button>
          <Button onClick={() => {
            setStopDialogOpen(false);
            navigate(`/results/${gameId}`);
          }} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default GameCard;
