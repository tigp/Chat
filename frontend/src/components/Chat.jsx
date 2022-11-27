import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, batch } from 'react-redux';

import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';
import Modal from './modals/Modal.jsx';
import routes from '../routes';
import { useAuth } from '../hooks/index.jsx';
import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';

const Chat = () => {
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(routes.getDataPath(), { headers: getAuthHeader() });
        batch(() => {
          dispatch(setChannels(data));
          dispatch(setMessages(data));
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [dispatch, getAuthHeader]);

  return (
    <>
      <Modal />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </div>
      </div>
    </>
  );
};

export default Chat;
