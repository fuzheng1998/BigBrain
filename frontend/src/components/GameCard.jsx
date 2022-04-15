import * as React from 'react';
import '@fontsource/roboto';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';
import {useNavigate} from 'react-router-dom';

function GameCard() {
    //fake data
    const gameId = 1;
    const navigate = useNavigate();
    const [gameState, setGameState] = React.useState(false);
    const [sessionDialogOpen, setSessionDialogOpen] = React.useState(false);
    const [stopDialogOpen, setStopDialogOpen] = React.useState(false);
    const handleSessionDialogClose = () => {
        setSessionDialogOpen(false);
    };
    const handleSessionDialogOpen = () => {
        setSessionDialogOpen(true);
    };
    const handleStopDialogClose = () => {
        setStopDialogOpen(false);
        navigate(`/results/${gameId}`);
    };
    const handleStopDialogOpen = () => {
        setStopDialogOpen(true);
    }


    const startHandler = () => {
        console.log('startup');
        setGameState(true);
        //  dialog of game session
        handleSessionDialogOpen();
    }
    const stopHandler = () => {
        console.log('stop');
        setGameState(false);
        //  dialog of game stop
        handleStopDialogOpen();
        //  naviage to game page
    }
    const editHandler = () => {
        console.log('edit');
        navigate('../admin/edit/' + gameId);
    }
    const deleteHandler = () => {
        console.log('delete');
        navigate('../admin/dashboard/' + gameId);
    }
    const copySessionId = () => {
        const data = document.getElementById('sessionId');
        // todo generate new session link
        const promise = navigator.clipboard.writeText(data.innerText);
        promise.then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
        console.log('Copied the text:');
    }
    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Dummy Game
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Time limitation: 10 mins"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Quantity: 10"
                        />
                    </ListItem>
                </List>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={editHandler}>Edit</Button>
                {gameState === false ? <Button size="small" onClick={startHandler}>Start</Button> :
                    <Button size="small" onClick={stopHandler}>stop</Button>}
                <Button size="small" onClick={deleteHandler}>Delete</Button>
            </CardActions>
            <Dialog onClose={handleSessionDialogClose} open={sessionDialogOpen}>
                <DialogTitle>Session ID</DialogTitle>
                <DialogContent>
                    <DialogContentText id="sessionId">
                        session id: 123456789
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSessionDialogClose}>Disagree</Button>
                    <Button onClick={copySessionId} autoFocus>
                        copy
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={stopDialogOpen} onClose={handleStopDialogClose}>
                <DialogTitle>Stop Game</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Would you like to view the results?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> {
                        setStopDialogOpen(false);
                        navigate('../admin/dashboard/');}} color="primary">
                        No
                    </Button>
                    <Button onClick={()=>{
                        setStopDialogOpen(false);
                        navigate(`/results/${gameId}`);
                    }} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default GameCard;
