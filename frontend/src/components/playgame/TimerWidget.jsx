import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import AlarmOffIcon from '@mui/icons-material/AlarmOff';

import { PlayGameContext } from '../../pages/PlayGame.jsx';

function TimerWidget() {
  const { countDown , setCountDown } = React.useContext(PlayGameContext);


  React.useEffect(() => {
    if(countDown>=0){
      const interval = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }
    
  }, [countDown]);

  console.log(countDown);
  return (
    <Box
    display="flex"
    justifyContent="center"
    sx={{
      border: "1px solid lightgrey",
    }}>
      <Typography component="h1" variant="h1">
        {countDown >= 0?(countDown):(<AlarmOffIcon sx={{ fontSize: 80 }} />)}
      </Typography>
    </Box>

  );
}

export default TimerWidget;