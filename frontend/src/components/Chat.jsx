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
    const getData = async () => {
      try {
        const { data } = await axios.get(routes.getDataPath(), { headers: getAuthHeader() });
        setContent(data);
        // save channels and mess to the storage => setChannels
      } catch (err) {
        console.log(err);
      }
    };
    // {channels: [{ id: 1, name: "general", removable: false }], messages: [], currentChannelId: 1}

    getData();
  }, []);

  console.log(content);

  return (
    <div className="row h-100 bg-white flex-md-row">HELLO CHAT</div>
  );
};

export default Chat;
