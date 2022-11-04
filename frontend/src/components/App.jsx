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

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    authState: false,
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
    <Link to="/login">Login</Link>
  </>
);

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
