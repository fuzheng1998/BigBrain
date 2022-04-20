import * as React from 'react';
import { createContext } from 'react';
import './App.css';
import '@fontsource/roboto';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';

// import mui tags
import GameEditForm from './components/GameEditForm';
import QuestionEditForm from './components/QuestionEditForm';
import HeaderBar from './components/Header';
import Dashboard from './components/Dashboard';

// import pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PlayGame from './pages/PlayGame.jsx';
import JoinGame from './pages/JoinGame.jsx'
import AdminResults from './pages/AdminResults';

// import components
// empty for now

export const userContext = createContext(null);
function EditGame () {
  return (
    <div>
      <h1>Edit Game</h1>
      <GameEditForm />
    </div>
  );
}

function EditQuestion () {
  return (
    <div>
      <h1>Edit Question</h1>
      <QuestionEditForm />
    </div>
  );
}

function NotFound () {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>

  );
}
function Header () {
  return (
    <header>
      <HeaderBar />
    </header>
  );
}

function App () {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<JoinGame />} exact={true} />
            <Route path={'login'} element={<Login />} exact={true} />
            <Route path={'register'} element={<Register />} exact={true} />
            <Route path="player/join" element={<JoinGame />} exact={true} />
            <Route path="player/join/:sessionId" element={<JoinGame />} exact={true} />
            <Route path="player/play/:sessionId" element={<PlayGame />} exact={true} />
            <Route path={'admin/dashboard'} element={<Dashboard />} exact={true} />
            <Route path={'admin/edit/:gameId'} element={<EditGame />} exact={true} />
            <Route path={'admin/edit/:gameId/question/:questionId'} element={<EditQuestion />} exact={true} />
            <Route path={'results/:gameId'} element={<AdminResults />} exact={true} />
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
  const [userToken, setUserToken] = React.useState(null);
  return (
    <userContext.Provider value={[userToken, setUserToken]}>
      <div>
        {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
        <Header userContextVal={[userToken, setUserToken]} />
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
    </userContext.Provider>
  );
}

export default App;
