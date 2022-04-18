import * as React from "react";
import {useContext, useRef} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {QUIZ} from "../config";
import {userContext} from "../App";

export default function GameAddDialog(props) {
    const [user,] = useContext(userContext);
    console.log(user);
    const newGameNameInput = useRef(null);
    let gameAddHandler = () => {
        let newGameName  = newGameNameInput.current.value;
        console.log(newGameName);
        let gameData = {
            'name': newGameName
        };
        const gameDataJson = JSON.stringify(gameData)
        fetch(QUIZ.ADD_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user
                },
                body: gameDataJson,
            }).then(response=>{
            if (response.ok) {
                console.log("game added");
            }
        })
            .catch(error => {
            console.log(error)})

        props.closeHandler();
    };
    return (
        <Dialog open={props.status} onClose={props.closeHandler}>
            <DialogTitle>Add New Game</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To add new game to this website, please enter your new game name here.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="new-game-name"
                    inputRef={newGameNameInput}
                    label="New Game Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeHandler}>Cancel</Button>
                <Button onClick={gameAddHandler}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}