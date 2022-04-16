import * as React from 'react';
import {createContext} from 'react';
import './App.css';
import '@fontsource/roboto';
import {BrowserRouter, Link, Outlet, Route, Routes} from 'react-router-dom';

// import mui tags
import Button from '@mui/material/Button';
import {Box, Grid} from '@mui/material';
import GameEditForm from './components/GameEditForm';
import QuestionEditForm from './components/QuestionEditForm';
import HeaderBar from './components/Header';
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import {ArrowBack} from "@mui/icons-material";

// import pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PlayGame from './pages/PlayGame.jsx';

// import components
import BasicTable from "./components/GameResultTable";
import GameResultChart from "./components/GameResultChart";
import GameCard from './components/GameCard';

export const isLoginContext = createContext(false);
export const isAdminContext = createContext(false);
function JoinGame () {
  return (
    <div>
      <h1>Join Game</h1>
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
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={5}>
                <Grid item xs={6}>
                    <Paper>
                        <Card>
                            <BasicTable/>
                        </Card>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Card>
                            <GameResultChart/>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
            <Button component={Link} variant={"contained"} to={'/admin/dashboard'} size={'large'} startIcon={<ArrowBack/>}>
                back to Dashboard
            </Button>
        </Box>
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

function App () {
  return (
        <div>
            <isLoginContext.Provider value={false}>

            {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<JoinGame />} exact={true}/>
                        <Route path={'login'} element={<Login />} exact={true}/>
                        <Route path={'register'} element={<Register />} exact={true}/>
                        <Route path="player/join" element={<JoinGame />} exact={true}/>
                        <Route path="player/play/:sessionId" element={<PlayGame />} exact={true}/>
                        <Route path={'admin/dashboard'} element={<Dashboard />} exact={true}/>
                        <Route path={'admin/edit/:gameId'} element={<EditGame />} exact={true}/>
                        <Route path={'admin/edit/:gameId/question/:questionId'} element={<EditQuestion />} exact={true}/>
                        <Route path={'results/:gameId'} element={<Results />} exact={true}/>
                        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            </isLoginContext.Provider>
        </div>
  );
}

function Layout () {
  return (
        <div>
            {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
            <Header/>
            <nav>
                <Link to="/">Home </Link>
                <Link to="login">Login </Link>
                <Link to="register">Register </Link>
                <Link to="player/join">Player Join </Link>
                <Link to="player/play/:sessionId">Player Play </Link>
                <Link to={'admin/dashboard'}>Admin Dashboard </Link>
                <Link to={'admin/edit/:gameId'}>Admin Game Edit </Link>
                <Link to={'admin/edit/:gameId/question/:questionId'}>Admin Question Edit </Link>
                <Link to={'results/:gameId'}>Results </Link>
            </nav>
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
export default App;
