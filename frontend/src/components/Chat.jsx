import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes';
// import useAuth from '../hooks/index.jsx';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
};

const Chat = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const getChats = async () => {
      const { data } = await axios.get(routes.getDataPath(), { headers: getAuthHeader() });
      setContent(data);
    };

    getChats();
  }, []);
  console.log(content);
  return (
    <h1>WELCOME to the Chat!</h1>
  );
};

export default Chat;
