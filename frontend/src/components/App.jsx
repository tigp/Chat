import React, { useState, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './Login.jsx';
import PageNotFound from './PageNotFound.jsx';
import NavBar from './NavBar.jsx';
import Chat from './Chat';
import AuthContext from '../context/index.jsx';

import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = ({ token, username }) => {
    setLoggedIn(true);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  };

  const logOut = () => {
    setLoggedIn(false);
    localStorage.clear();
  };

  const memoOnAuth = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={memoOnAuth}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPath()} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Routes>
          <Route
            path={routes.rootPagePath()}
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
