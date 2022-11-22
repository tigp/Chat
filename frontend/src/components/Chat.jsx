import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, batch } from 'react-redux';

import routes from '../routes';
import useAuth from '../hooks/index.jsx';
import Channels from './Channels.jsx';
import MessagesBox from './MessagesBox.jsx';
import { setInitialState } from '../slices/channelsSlice.js';
import { addMessages } from '../slices/messagesSlice.js';

const Chat = () => {
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(routes.getDataPath(), { headers: getAuthHeader() });
        batch(() => {
          dispatch(setInitialState(data));
          dispatch(addMessages(data));
        });
      } catch (err) {
        console.log(err);
      }
    };
    // const data = {
    //   channels: [ { id: generalChannelId, name: 'general', removable: false }, ..,],
    //   messages: [],
    //   currentChannelId: generalChannelId,
    // };

    getData();
  }, [dispatch, getAuthHeader]);

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
