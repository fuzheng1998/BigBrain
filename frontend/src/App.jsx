import * as React from 'react';
import './App.css';
import '@fontsource/roboto';
import {BrowserRouter, Link, Outlet, Route, Routes} from 'react-router-dom';

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
        <h1>Basic Example</h1>

        <p>
            This example demonstrates some of the core features of React Router
            including nested <code>&lt;Route&gt;</code>s,{' '}
            <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
            visits an unrecognized URL.
        </p>
    </header>
  );
}

export default function App () {
  return (
        <div>
            <Header/>
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
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="admin/dashboard">Dashboard</Link>
                    </li>
                </ul>
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
            <h2>Dashboard</h2>
        </div>
  );
}
