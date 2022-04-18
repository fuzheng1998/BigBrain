import * as React from 'react';
import '@fontsource/roboto';
import {
    Autocomplete,
    Box,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import {useNavigate, useParams} from 'react-router-dom';

function GameEditForm () {
  const { gameId } = useParams();
  console.log('game id' + gameId);
  return (
        <Box component="form" sx={{
          maxWidth: '100%',
        }}>
            {/*todo game title should be editable*/}
            <GameQuestionList/>
    </Box>

  );
}
function GameQuestionList () {
  const { gameId } = useParams()
  const [newGameDialogOpen, setNewGameDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  const deleteGameHandler = () => {
  //  todo delete game from database
    console.log('delete game');
    navigate('../../admin/edit/' + gameId);
    console.log('game deleted')
  };
  const navToQuestionEdit = () => {
    navigate('../../admin/edit/' + gameId + '/question/1');
  };
  return (
      <>
        <Box sx={{ margin: 'auto', width: '70%' }}>
            <TextField
                label="Game Title"
                variant="outlined"
                size={'small'}
                fullWidth={true}
            />
            {/* card is for 1 question, to be iterated*/}
            <Card sx={{ display: 'flex' }}>
                <Typography variant="body1">Questions</Typography>
                <ButtonGroup variant="text">
                    <Button onClick={navToQuestionEdit}>Edit</Button>
                    <Button onClick={deleteGameHandler}>Delete</Button>
                </ButtonGroup>
            </Card>
        {/* card is for 1 question, to be iterated */}

        </Box>
      <Box>
          <QuestionAddFormDialog open={newGameDialogOpen} onClose={() => setNewGameDialogOpen(false)}/>
      </Box>

    </>
  );
}
function QuestionAddFormDialog () {
  const questionType = [
    { label: 'Multi', type: 0 },
    { label: 'Single', type: 1 }
  ];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const addHandler = () => {
      let newQuestion = {

      }
    console.log('question added');
    setOpen(false);
  };

  return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add New Question
            </Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>New Question</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        disablePortal
                        options={questionType}
                        fullWidth={true}
                        renderInput={(params) => <TextField {...params} label="Question Type"/>}
                    />
                    <TextField type={'text'} variant={'outlined'} fullWidth={true} label="Question"/>
                    <TextField
                        label="Time Limit"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth={true}
                    />
                    <TextField
                        label="Points"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth={true}
                    />
                    <TextField label={'Question Image'} fullWidth={true} type={'url'}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={addHandler}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
  );
}
export default GameEditForm;
