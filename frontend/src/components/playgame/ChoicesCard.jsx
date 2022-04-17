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

function handleClick(event) {
  console.log(event.target.innerText);
}

function handleSubmit(event) {
  event.preventDefault();
  const answerFD = new FormData(event.currentTarget);
  let formDataObj = {};
  answerFD.forEach((value, key) => formDataObj[key] = value);
  console.log(formDataObj);
}

function SingleToggleButton(value, key) {
  const [selected, setSelected] = React.useState(false);
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
  const { countDown , setCountDown } = React.useContext(PlayGameContext);

  const choiceList = ["choice1", "choice2", "choice3", "choice4", "choice5", "choice6"];

  const [playerAnswers, setPlayerAnswers] = React.useState(["choice4"]);

  const handleChoices = (event, newAnswers) => {
    setPlayerAnswers(newAnswers);
    console.log(newAnswers);
  };

  let choiceBtnList = choiceList.map((v, i) => {
    return SingleToggleButton(v, i);
  });
  return (
    <Box>
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