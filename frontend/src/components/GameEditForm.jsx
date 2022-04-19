import * as React from 'react';
import { useState } from 'react';
import '@fontsource/roboto';
import {
  Autocomplete,
  Box,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  TextField,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PhotoCamera } from "@mui/icons-material";
import { QUIZ } from "../config";

function GameEditForm() {
  const { state } = useLocation();
  const { gameId } = useParams();
  const gameData = state
  console.log('game id' + gameId);
  console.log(state.gameData);
  return (
    <Box component="form" sx={{
      maxWidth: '100%',
    }}>
      {/*todo game title should be editable*/}
      <GameQuestionList gameData={gameData} />
    </Box>

  );
}

function GameQuestionList(props) {

  const { gameId } = useParams()
  const [newGameDialogOpen, setNewGameDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  const deleteQuestionHandler = () => {
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
            <Button onClick={deleteQuestionHandler}>Delete</Button>
          </ButtonGroup>
        </Card>
        {/* card is for 1 question, to be iterated */}

      </Box>
      <Box>
        <QuestionAddFormDialog open={newGameDialogOpen} onClose={() => setNewGameDialogOpen(false)} gameData={props.gameData} />
      </Box>

    </>
  );
}

function QuestionAddFormDialog(props) {
  const defaultQuestion = {
    content: '',
    points: 0,
    time: 0,
    type: 0,//0: multi, 1: single
    // Removed since not populated correctly
    // media: { 
    //   type: 0,//0: image, 1: video
    //   url: ''
    // },
    options: [],
    answers: [],
    mediaType: null,
    image: '',
    videoCode: '',
  }
  const { gameId } = useParams()
  const [mediaType, setMediaType] = React.useState('image');
  const [question, setQuestion] = React.useState(defaultQuestion);
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
    setOptionsList([1]);
    setQuestion(defaultQuestion);
  };

  const addHandler = () => {
    console.log(question);
    let game = props.gameData.gameData;
    if (!("questions" in game)) {
      console.log("create empty quesiton")
      game['questions'] = [];
    }
    game['questions'].push(question);
    console.log(game);
    fetch(QUIZ.PUT_URL + gameId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      },
      body: JSON.stringify(game)
    }).then(res => {
      console.log(res);
      handleCloseDialog();
    }).catch(err => {
      console.log(err);
    });
    console.log('question added');

    // setOpen(false);
  };

  // let optionsComponentList = [];
  const [optionsList, setOptionsList] = useState([1])
  const handleOptionList = () => {
    console.log("In handle!");
    console.log(optionsList);
    setOptionsList(optionsList.concat(1));
    // optionsComponentList.push(optionInput());
  }

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
            disableClearable
            onChange={
              (event, value) => {
                // add type to question state
                setQuestion({ ...question, type: value.type });
              }
            }
            
            options={questionType}
            fullWidth={true}
            renderInput={(params) => <TextField {...params} label="Question Type" />}
            margin={"normal"}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            defaultValue={questionType[0]}
          />
          <TextField type={'text'} variant={'outlined'} fullWidth={true} label="Question"
            margin={"normal"}
            onChange={
              (event) => {
                console.log(event.target.value)
                setQuestion({ ...question, content: event.target.value });
              }
            } />
          <TextField
            label="Time Limit"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth={true}
            margin={"normal"}
            onChange={
              (event) => {
                console.log(event.target.value);
                setQuestion({ ...question, time: event.target.value });
              }
            }
          />
          <TextField
            label="Points"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth={true}
            margin={"normal"}
            onChange={
              (event) => {
                console.log(event.target.value);
                setQuestion({ ...question, points: event.target.value });
              }
            }
          />
          <Autocomplete
            disableClearable
            renderInput={
              (params) => <TextField {...params} label="media Type" />
            }
            options={
              [
                { label: 'image', type: 'image' },
                { label: 'video', type: 'video'}
              ]
            }
            defaultValue={{
              label: 'image', type: 'image'
            }}
            onChange={
              (event, value) => {
                console.log(value.type);
                setQuestion({ ...question, mediaType: value.type });
                setMediaType(value.type);
              }
            }
            margin={"normal"}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.label === value.label}
          />
          {
            mediaType === 'video' ?
              <TextField label='Question video Short Code' fullWidth={true} type={'url'}
                margin={"normal"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={
                  (event) => {
                    console.log(event.target.value);
                    setQuestion({ ...question, videoCode: event.target.value });
                  }
                }
              /> :
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>

          }
          {/*option list*/}
          {
            optionsList.map(
              (item, idx) => {
                return <OptionInput key={idx} optionId={idx + 1} question={question}
                  setQuestion={setQuestion} />
              }
            )
          }
          <Button variant={"text"} onClick={handleOptionList}>add more options</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={addHandler}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function OptionInput(props) {
  // console.log(props);
  const { options, setOptions } = useState([]);
  return (
    <Box component={"div"} sx={
      { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }
    }>
      {/* TODO: 這邊不能直接加，如果Blur兩次就會加兩個。 可以考慮用props.optionId固定他在array中的位置，重複blur的時候就可以看props.optionId去更新資料 */}
      <TextField
        onBlur={
          (event) => {
            console.log(event.target.value);
            props.setQuestion({
              ...props.question,
              options: [...props.question.options, { id: props.optionId, content: event.target.value }]
            });
          }
        }
        label={"Option " + props.optionId}
        margin={"normal"}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined" fullWidth={true} />
      <Autocomplete 
        disableClearable
        renderInput={
          (params) => <TextField {...params} label="Answer" />
        }
        options={
          [
            { label: 'True', answer: true },
            { label: 'False', answer: false },
          ]
        }
        defaultValue={
          { label: 'True', answer: true }
        }
        onChange={
          (event, value) => {
            let tempProps = {...props.question};
            if (value.answer) {
              // Received True
              if(!("answers" in tempProps)){
                tempProps["answers"] = [props.optionId]
              }
              else{
                // check if option is duplicated
                if(!(tempProps["answers"].includes(props.optionId))){
                  tempProps["answers"].push(props.optionId);
                }
              }
              // props.setQuestion({ ...props.question, answers: [props.optionId] });
            }
            else{
              //Received False, Remove option from solution list
              if("answers" in tempProps){
                if(tempProps["answers"].includes(props.optionId)){
                  tempProps["answers"] = tempProps["answers"].filter(v=>v!==props.optionId);
                }
              }
            }
            props.setQuestion(tempProps);
          } 
        }
        isOptionEqualToValue={(option, value) => option.label === value.label}
      />

    </Box>
  )
}

export default GameEditForm;
