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
import Chat from './Chat.jsx';
import AuthContext from '../context/index.jsx';

import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  const memoOnAuth = useMemo(() => ({
    logIn,
    logOut,
    getAuthHeader,
    user,
  }), [user]);

  return (
    <AuthContext.Provider value={memoOnAuth}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to={routes.loginPagePath()} />;
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
