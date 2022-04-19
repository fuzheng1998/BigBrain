import React from 'react';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { PlayGameContext } from '../../pages/PlayGame.jsx';

import { PLAYER } from '../../config.js';


// Calls PLAYER.ANSWER_URL to get correct answer after timer is up
// @param {} playerId
// @returns {Promise.Json} response body from game status request
function requestGetAnswer(playerId) {
  const answerRequest = new Request(PLAYER.ANSWER_URL(playerId),
      {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: undefined
      });

  // console.log(answerRequest);

  return fetch(answerRequest)
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
          // console.error('function requestGetAnswer fetch failed', error);
          throw error;
      });

}

// Fetch answer of question
// @param {} playerId,
// @returns nothing
function getAnswerAsPlayer(playerId) {
  // set states
  return requestGetAnswer(playerId)
      .then(responseObj => {
          console.log(responseObj)
          return responseObj["answerIds"];
      }).catch(error => {
          console.error('function getAnswerAsPlayer failed', error);
          alert(error);
          // throw(error);
      });
}



// Calls PLAYER.ANSWER_URL to submit answer
// @param {} playerId
// @returns {Promise.Json} response body from put request (which is empty if success)
function requestPutAnswer(playerId,answerDataJson) {
  console.log(answerDataJson);
  const answerRequest = new Request(PLAYER.ANSWER_URL(playerId),
      {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: answerDataJson
      });

  // console.log(answerRequest);

  return fetch(answerRequest)
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
          // console.error('function requestGetAnswer fetch failed', error);
          throw error;
      });

}

// Fetch answer of question
// @param {} playerId,
// @returns nothing
function putAnswerAsPlayer(playerId, answerIds) {
  const answerDataObj = {"answerIds":answerIds};
  const answerDataJson = JSON.stringify(answerDataObj);
  console.log("Attempt to send", answerDataObj, answerDataJson);
  // set states
  return requestPutAnswer(playerId,answerDataJson)
      .then(responseObj => {
          console.log(responseObj)
      }).catch(error => {
          console.error('function putAnswerAsPlayer failed', error);
          alert(error);
          // throw(error);
      });
}


function SingleToggleButton(value, key) {
  return (
    <ToggleButton
      value={value}
      key={key}
      sx={{
        "&.MuiToggleButtonGroup-grouped": {
          borderRadius: "4px !important",
          my:2,
          border: "1px solid lightgrey !important"
        },
      }}
    >
      {value}
    </ToggleButton>
  );
}

function ChoicesCard() {
  const playerId = localStorage.getItem('PLAYER_ID');

  const { countDown , setCountDown } = React.useContext(PlayGameContext);

  const choiceDict = {0:"choice1",1:"choice2",2:"choice3",3:"choice4",4:"choice5",5:"choice6"};
  const choiceList = Object.values(choiceDict);
  // const choiceList = ["choice1", "choice2", "choice3", "choice4", "choice5", "choice6"];

  const [playerAnswers, setPlayerAnswers] = React.useState([]);

  React.useEffect(async () => {
    if(countDown<0){
      // set the answers to show correct answers
      // const answerIds = await getAnswerAsPlayer(playerId);
      const answerIds = [0,1,4];
      setPlayerAnswers(answerIds.map(k=>choiceList[k]));
    }
  }, [countDown]);

  const handleChoices = (event, newAnswers) => {
      setPlayerAnswers(newAnswers);
      const newAnswersIds = newAnswers.map(v => Object.keys(choiceDict).find(k => choiceDict[k] === v))
      console.log("Attemp to pass:", newAnswers , newAnswersIds);
      putAnswerAsPlayer(playerId, newAnswersIds);
      
  };

  let choiceBtnList = choiceList.map((v, i) => {
    return SingleToggleButton(v, i);
  });

  return (
    <Box sx={{width:"100%"}}>
      {countDown<0 ? ("Correct answer is:"):("Your answer is:")}
      <ToggleButtonGroup
        value={playerAnswers}
        onChange={handleChoices}
        disabled={countDown<0}
        sx={{
          border: "1px solid lightgrey",
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {choiceBtnList}
      </ToggleButtonGroup>
    </Box>
  );
}


export default ChoicesCard;