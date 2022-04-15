import * as React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";

export default function GameAddDialog(props) {
    let gameAddHandler = () => {
        // todo add game to database
        console.log("game added");
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
                    label="New Game Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeHandler}>Cancel</Button>
                <Button onClick={gameAddHandler}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}
