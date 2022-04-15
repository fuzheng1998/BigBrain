import * as React from 'react';
import {Box, Grid} from "@mui/material";
import GameCard from "./GameCard";

export default function GameCardLayout() {
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={1}>
                <Grid container item spacing={3}>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                </Grid>
                <Grid container item spacing={3}>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                </Grid>
                <Grid container item spacing={3}>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
