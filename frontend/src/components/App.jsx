import React, { useState, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import Login from './Login.jsx';
import PageNotFound from './PageNotFound.jsx';
import AuthContext from '../context/index.jsx';
// import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import NavBar from './NavBar.jsx';

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
  });
  const memoOnUser = useMemo(() => ({ userData, setUserData }), [userData]);

  return (
    <AuthContext.Provider value={memoOnUser}>
      {children}
    </AuthContext.Provider>
  );
};

const Home = () => (
  <>
    <h1>Welcome to the chat!</h1>
    <Link to={routes.loginPagePath()}>Login</Link>
  </>
);

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Routes>
          <Route path={routes.rootPagePath()} element={<Home />} />
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
