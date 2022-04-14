import * as React from 'react';
import './App.css';
import '@fontsource/roboto';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import GameCard from './components/GameCard';
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import GameEditForm from './components/GameEditForm';
import QuestionEditForm from './components/QuestionEditForm';
import HeaderBar from './components/Header';


import Login from './page/Login.jsx';
import Register from './page/Register.jsx';

function JoinGame () {
  return (
    <div>
      <h1>Join Game</h1>
    </div>
  );
}

function Login () {
  return (
      <div>
        <h1>Login</h1>
      </div>
  );
}

function Register () {
  return (
      <div>
        <h1>Register</h1>
      </div>
  );
}

function PlayGame () {
  return (
      <div>
        <h1>Play Game</h1>
      </div>
  );
}

function EditGame () {
  return (
      <div>
        <h1>Edit Game</h1>
          <GameEditForm/>
      </div>
  );
}

function Results () {
  return (
      <div>
        <h1>Results</h1>
      </div>
  );
}

function EditQuestion () {
  return (
      <div>
        <h1>Edit Question</h1>
          <QuestionEditForm/>
      </div>
  );
}

function NotFound () {
  return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>

  );
}
function Header () {
  return (
    <header>
        <HeaderBar/>
    </header>
  );
}

export default function App () {
  return (
        <div>

            {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<JoinGame />} />
                        <Route path={'login'} element={<Login />} />
                        <Route path={'register'} element={<Register />} />
                        <Route path="player/join" element={<JoinGame />} />
                        <Route path="player/play/:sessionId" element={<PlayGame />} />
                        <Route path="admin/dashboard" element={<Dashboard />} />
                        <Route path={'admin/edit/:gameId'} element={<EditGame />} />
                        <Route path={'admin/edit/:gameId/:questionId'} element={<EditQuestion />} />
                        <Route path={'results/:gameId'} element={<Results />} />
                        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </div>
  );
}

function Layout () {
  return (
        <div>
            {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
            <Header/>

            <hr />

            {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
            <Outlet />
        </div>
  );
}

function Dashboard () {
  return (
        <div>
            <h1>Dashboard</h1>
            <Button variant="outlined">add game</Button>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid container item spacing={3}>
                        <Grid item xs={4}>
                            <GameCard />
                        </Grid>
                        <Grid item xs={4}>
                            <GameCard />
                        </Grid>
                        <Grid item xs={4}>
                            <GameCard/>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={4}>
                            <GameCard />
                        </Grid>
                        <Grid item xs={4}>
                            <GameCard />
                        </Grid>
                        <Grid item xs={4}>
                            <GameCard/>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={4}>
                            <GameCard />
                        </Grid>
                        <Grid item xs={4}>
                            <GameCard />
                        </Grid>
                        <Grid item xs={4}>
                            <GameCard/>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

        </div>
  );
}
