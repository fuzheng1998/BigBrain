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

function StandaloneToggleButton(value, key) {
  const [selected, setSelected] = React.useState(false);

  return (
    <ToggleButton
      value={value}
      // selected={selected}
      key={key}
      // onChange={() => {
      //   setSelected(!selected);
      // }}
      sx={{
        // mx: 8,
        "&.MuiToggleButtonGroup-grouped": {
          borderRadius: "4px !important",
          my:2,
          border: "1px solid lightgrey !important"
        }
      }}
    >
      {value}
    </ToggleButton>
  );
}

function ChoicesCard() {
  const choiceList = ["choice1", "choice2", "choice3", "choice4", "choice5", "choice6"];

  const [playerAnswers, setPlayerAnswers] = React.useState([]);

  const handleChoices = (event, newAnswers) => {
    setPlayerAnswers(newAnswers);
    console.log(newAnswers);
  };

  let choiceBtnList = choiceList.map((v, i) => {
    // return (<ToggleButton variant="contained" value={v} onClick={handleClick} key={i}>{v}</ToggleButton>)
    return StandaloneToggleButton(v, i);
  });
  // console.log(choiceList);
  // console.log(choiceBtnList);
  return (
    <Box>
      <ToggleButtonGroup
        value={playerAnswers}
        onChange={handleChoices}
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