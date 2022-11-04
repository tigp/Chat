import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import PageNotFound from './PageNotFound.jsx';
import AuthContext from '../context/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    authState: false,
  });
  const memoOnUser = useMemo(() => ({ userData, setUserData }), []);

  return (
    <AuthContext.Provider value={memoOnUser}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
