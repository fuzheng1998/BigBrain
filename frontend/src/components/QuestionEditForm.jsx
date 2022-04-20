import * as React from 'react';
import {useEffect, useState} from 'react';
import '@fontsource/roboto';
import {Autocomplete, Box, ButtonGroup, IconButton, Input, TextField, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {PhotoCamera} from "@mui/icons-material";
import {QUIZ} from "../config";

const questionType = [
    {label: 'Multi', type: 0},
    {label: 'Single', type: 1}
];

function QuestionEditForm() {
    const {gameId, questionId} = useParams();
    // console.log(gameId);
    // console.log(questionId);
    const {state} = useLocation()
    // console.log(state.questionData)
    const singleQuestionData = state.singleQuestionData;
    // const fullQuestionList = state.fullQuestionList;
    // console.log(fullGameData)
    // console.log(questionObj.options);
    const [questionList, setQuestionList] = useState()
    const [question, setQuestion] = useState(singleQuestionData);
    const [gameDataWithQuestion, setGameDataWithQuestion] = useState();
    // console.log(gameDataWithQuestion);
    // console.log(question);
    const navigate = useNavigate();
    // get full game data and get quiz data by id
    const updateQuestionList = (qId, q) => {
        let idx = qId - 1;
        let newQList = [...questionList.slice(0,idx),
            q,
            ...questionList.slice(idx+1)
        ]
        // setQuestionList(newQList);
        // console.log(questionList);
        return newQList
    };
    useEffect(() => {
        fetch(QUIZ.GET_QUESTION_URL(gameId), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            },

        }).then(response => response.json())
            .then(res => {
                console.log(res);
                setGameDataWithQuestion(res);
                setQuestionList(res.questions);
            })
            .catch(error => console.log(error));
    }, []);

    // console.log(gameDataWithQuestion);
    // console.log(questionList);
    const cancelEdit = ()=>{
        navigate(-1);
    }
    const updateQuestion = () => {
        console.log('updating Question');
        console.log('line60 question list')
        // console.log(question);
        // console.log('updatedQList');
        // console.log(updatedQList);
        gameDataWithQuestion['questions'] = updateQuestionList(questionId, question);
        // console.log(gameDataWithQuestion);
        // gameDataWithQuestion['title'] =
        fetch(QUIZ.PUT_URL + gameId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            },
            body: JSON.stringify(gameDataWithQuestion)
        }).then(response => response.json())
            .then(res => {
                console.log(res);
                navigate(-1);
            })
            .catch(error => console.log(error));
        console.log('question updated')
    };
    return (
        <>
            <Autocomplete
                disablePortal
                disableClearable={true}
                options={questionType}
                fullWidth={true}
                renderInput={(params) => <TextField {...params} label="Question Type"/>}
                defaultValue={questionType[singleQuestionData.type]}
                onChange={(event, value) => {
                    setQuestion({...question, type: value.type})
                }}
            />
            <TextField type={'text'} variant={'outlined'} fullWidth={true} label="Question"
                       onChange={(event) => {
                           setQuestion({...question, content: event.target.value})
                       }}
                       defaultValue={question.content}
            />
            <TextField
                label="Time Limit"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth={true}
                defaultValue={singleQuestionData.time}
                onChange={(event) => {
                    setQuestion({...question, time: event.target.value})
                }}
            />
            <TextField
                label="Points"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth={true}
                defaultValue={singleQuestionData.points}
                onChange={(event) => {
                    setQuestion({...question, points: event.target.value})
                }}
            />
            {/*show photo or video link*/}
            {singleQuestionData.mediaType === 'video' ?
                <TextField label={'Question Image'} fullWidth={true} type={'url'}/> :
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file"/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera/>
                    </IconButton>
                </label>
            }
            <Box>
                <Typography variant={'h6'}>Answers</Typography>
                {singleQuestionData.options.map(
                    (option, idx) => {
                        return <OptionEditor key={idx} optionId={idx + 1}
                                             question={question}
                                             setQuestion={setQuestion}
                        />

                    }
                )}

                <ButtonGroup fullWidth={true} variant={'contained'}>
                    <Button onClick={cancelEdit}>Cancel</Button>
                    <Button onClick={updateQuestion}>OK</Button>
                </ButtonGroup>
            </Box>
        </>

    );
}

function OptionEditor(props) {
    console.log('option loading');
    console.log();
    const question = props.question
    const optionAnswerIdList = props.question.answers;

    const isCorrectOption = (optionId) => {
        return optionAnswerIdList.includes(optionId);
    }
    const optionId = props.optionId;
    // console.log(optionId)
    const options = props.question.options
    // console.log(options);
    const setQuestion = props.setQuestion;
    const updateOpList = (optionId, option) => {
        let idx = optionId - 1;
        let newOption ={
            id: optionId,
            content: option
        }
        let newOpList = [...options.slice(0,idx),
            newOption,
            ...options.slice(idx+1)
        ]
        // setQuestionList(newQList);
        // console.log(questionList);
        console.log(newOpList);
        return newOpList;
    };
    return (
        <Box component={"div"} sx={
            {display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}
        }>
            <TextField
                label={"Option" + optionId}
                margin={"normal"}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                fullWidth={true}
                defaultValue={options[optionId-1].content}
                onChange={(e) => {
                    // console.log(e.target.value)
                    const updatedOpList = updateOpList(optionId, e.target.value);
                    // console.log('updated list')
                    // console.log(updatedOpList);
                    question.options = updatedOpList;
                    // console.log(question)
                }
                }
            />
            <Autocomplete
                disableClearable
                renderInput={
                    (params) => <TextField {...params} label="Answer"/>
                }
                options={
                    [
                        {label: 'true', answer: true},
                        {label: 'false', answer: false},
                    ]
                }
                defaultValue={{
                    label: isCorrectOption(optionId) ? 'true' : 'false',
                    answer: isCorrectOption(optionId)
                }}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                onChange={(event, value) => {
                    // console.log(value);
                    // console.log(value.answer)
                    props.setQuestion({
                        ...props.question,
                        answers: value.answer ? [...props.question.answers] : props.question.answers.filter(answerId => answerId !== optionId)
                    })
                }}
            />
        </Box>
    );
}

export default QuestionEditForm;
