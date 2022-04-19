import React from 'react';

// import mui tags
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import { ArrowBack } from "@mui/icons-material";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import { Link as RouterLink, useParams } from 'react-router-dom';

import GameResultTable from "../components/GameResultTable";
import GameResultChart from "../components/GameResultChart";



function AdminResults() {
  let { gameId } = useParams();
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Typography component="h1" variant="h3">
          Results for game {gameId}
      </Typography>
      <Box
        sx={{
          mt: 1,
          p: 0.05,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          p: 2,
          bgcolor: '#f0f0f0'
        }}
      >
        <Grid container spacing={2} sx={{mt: 0}}>
          <Grid item xs={6} sx={{maxHeight:'80vh', display: 'flex', flexDirection: 'column', gap: 2}}>
              <GameResultTable />
            <Button component={RouterLink} variant={"contained"} to={'/admin/dashboard'} size={'large'} startIcon={<ArrowBack />} >
                Back to Dashboard
            </Button>
          </Grid>
          <Grid item xs={6}>
            <GameResultChart />
          </Grid>
        </Grid>
      </Box>
      
    </Container>
  );
}

export default AdminResults;