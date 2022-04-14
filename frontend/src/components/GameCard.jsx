import * as React from 'react';
import '@fontsource/roboto';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function GameCard () {
  return (
        <Card sx={{ maxWidth: 345 }}>
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
                <Button size="small">Edit</Button>
                <Button size="small">Startup</Button>
                <Button size="small">Stop</Button>
                <Button size="small">Delete</Button>
            </CardActions>
        </Card>
  );
}
export default GameCard;
