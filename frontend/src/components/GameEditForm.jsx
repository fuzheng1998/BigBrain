import * as React from 'react';
import '@fontsource/roboto';
import {
  Box,
  ButtonGroup,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

function GameEditForm () {
  return (
        <Box component="form" sx={{
          maxWidth: '100%',
        }}>
            <Typography variant="h1">Game Title</Typography>
            <TextField
    label="Game Title"
    variant="outlined"/>
            <GameQuestionList/>
    </Box>

  );
}
function GameQuestionList () {
  const [open, setOpen] = React.useState(false);

  return (
      <>
        <Box>
            <Card sx={{ display: 'flex' }}>
                <Typography variant="body1">Questions</Typography>
                <ButtonGroup size={'small'} variant="text" aria-label="text button group">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </ButtonGroup>
            </Card>
            <Card sx={{ display: 'flex' }}>
                <Typography variant="body1">Questions</Typography>
                <ButtonGroup size={'small'} variant="text" aria-label="text button group">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </ButtonGroup>
            </Card>
        </Box>
      <Box>
          <GameAddFormDialog open={open} onClose={() => setOpen(false)}/>
      </Box>

    </>
  );
}
function GameAddFormDialog () {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add New Game
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="game-title"
                        label="Game Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
  );
}
export default GameEditForm;
