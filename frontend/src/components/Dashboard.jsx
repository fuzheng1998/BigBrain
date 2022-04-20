import React from 'react';
import Button from '@mui/material/Button';
import GameAddDialog from './GameAddDialog';
import GameCardLayout from './GameCardLayout';

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const dialogClose = () => {
    setOpen(false);
  };
  const dialogOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant='outlined' onClick={dialogOpen}>add game</Button>
      <GameAddDialog status={open} closeHandler={dialogClose} />
      <GameCardLayout />

    </div>
  );
}
