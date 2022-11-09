import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, batch } from 'react-redux';

import routes from '../routes';
// import useAuth from '../hooks/index.jsx';
import Channels from './Channels.jsx';
import MessagesBox from './MessagesBox.jsx';
import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
};

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(routes.getDataPath(), { headers: getAuthHeader() });
        batch(() => {
          dispatch(setChannels(data.channels));
          dispatch(setMessages(data.messages));
        });
      } catch (err) {
        console.log(err);
      }
    };
    // {channels: [{ id: 1, name: "general", removable: false }], messages: [], currentChannelId: 1}

    getData();
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <MessagesBox />
      </div>
    </div>
  );
};

export default Chat;
