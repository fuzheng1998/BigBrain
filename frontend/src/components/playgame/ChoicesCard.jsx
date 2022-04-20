import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types'

import { PLAYER } from '../../config.js';

// Calls PLAYER.ANSWER_URL to get correct answer after timer is up
// @param {} playerId
// @returns {Promise.Json} response body from game status request
function requestGetAnswer (playerId) {
  const answerRequest = new Request(PLAYER.ANSWER_URL(playerId),
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: undefined
    });

  return fetch(answerRequest)
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
      throw error;
    });
}

// Fetch answer of question
// @param {} playerId,
// @returns nothing
function getAnswerAsPlayer (playerId) {
  // set states
  return requestGetAnswer(playerId)
    .then(responseObj => {
      return responseObj.answerIds;
    }).catch(error => {
      console.error('function getAnswerAsPlayer failed', error);
      console.info(error)
      // alert(error);
      return null;
      // throw(error);
    });
}

// Calls PLAYER.ANSWER_URL to submit answer
// @param {} playerId
// @returns {Promise.Json} response body from put request (which is empty if success)
function requestPutAnswer (playerId, answerDataJson) {
  console.log(answerDataJson);
  const answerRequest = new Request(PLAYER.ANSWER_URL(playerId),
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: answerDataJson
    });

  console.log(answerRequest);

  return fetch(answerRequest)
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
      // console.log('requestLoginAsUser():'+ JSON.stringify(responseObj));
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
function putAnswerAsPlayer (playerId, answerIds) {
  const answerDataObj = { answerIds: answerIds.map(Number) };
  console.log(answerDataObj);
  const answerDataJson = JSON.stringify(answerDataObj);
  // set states
  return requestPutAnswer(playerId, answerDataJson)
    .then(responseObj => {
      // console.log(responseObj)
    }).catch(error => {
      console.error('function putAnswerAsPlayer failed', error);
      alert(error);
      // throw(error);
    });
}

function SingleToggleButton (value, key) {
  return (
    <ToggleButton
      value={value}
      key={key}
      sx={{
        '&.MuiToggleButtonGroup-grouped': {
          borderRadius: '4px !important',
          my: 2,
          border: '1px solid lightgrey !important'
        },
      }}
    >
      {value}
    </ToggleButton>
  );
}

function ChoicesCard ({ questionObj, countDown }) {
  const [playerAnswers, setPlayerAnswers] = React.useState([]);
  const [correctAnswersId, setCorrectAnswersId] = React.useState(null);

  const [prevQuestionObj, setPrevQuestionObj] = React.useState(null);

  const playerId = localStorage.getItem('PLAYER_ID');

  let choiceDict = {}
  if (questionObj == null) {
    // placeholder
    choiceDict = { 0: 'choice1', 1: 'choice2', 2: 'choice3', 3: 'choice4', 4: 'choice5', 5: 'choice6' };
  } else {
    questionObj.options.forEach(option => { choiceDict[option.id] = option.content });
  }

  // const choiceDict = {0:'choice1',1:'choice2',2:'choice3',3:'choice4',4:'choice5',5:'choice6'};
  // const choiceList = Object.values(choiceDict);
  // const choiceList = ['choice1', 'choice2', 'choice3', 'choice4', 'choice5', 'choice6'];

  React.useEffect(() => {
    function getCorrectAnswers () {
      if (countDown < 0) {
        getAnswerAsPlayer(playerId).then(answerIds => {
          if (answerIds != null) {
            // override player answer
            setCorrectAnswersId(answerIds);
            setPlayerAnswers(answerIds.map(k => choiceDict[k]));
          }
        });
      }
    }

    if (countDown < 0) {
      getCorrectAnswers();
      const interval = setInterval(getCorrectAnswers, 1000);

      return () => {
        clearInterval(interval);
      }
    }

    // detect if there is a new question
    if (questionObj != null) {
      if (prevQuestionObj == null || prevQuestionObj.content !== questionObj.content) {
        setCorrectAnswersId(null);
        setPlayerAnswers([]);
      }
      setPrevQuestionObj(questionObj);
    }
  }, [questionObj]);

  const handleChoices = (event, newAnswers) => {
    setPlayerAnswers(newAnswers);
    const newAnswersIds = newAnswers.map(v => Object.keys(choiceDict).find(k => choiceDict[k] === v))
    putAnswerAsPlayer(playerId, newAnswersIds);
  };

  // let choiceBtnList = choiceList.map((v, i) => {
  //   return SingleToggleButton(v, i);
  // });
  const choiceBtnList = Object.keys(choiceDict).map(k => {
    return SingleToggleButton(choiceDict[k], k);
  });

  return (
    <Box sx={{ width: '100%' }}>
      {correctAnswersId !== null ? ('Correct answer is:') : ('Your answer is:')}
      <ToggleButtonGroup
        value={playerAnswers}
        onChange={handleChoices}
        disabled={countDown < 0}
        sx={{
          border: '1px solid lightgrey',
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

ChoicesCard.propTypes = {
  questionObj: PropTypes.object,
  countDown: PropTypes.number
}

export default React.memo(ChoicesCard, (prevProps, nextProps) => {
  if (prevProps.questionObj != null && nextProps.questionObj != null && prevProps.countDown != null && nextProps.countDown != null) {
    return (prevProps.questionObj.content === nextProps.questionObj.content) && (prevProps.countDown === nextProps.countDown);
  } else {
    return false;
  }
});

// export default ChoicesCard;
