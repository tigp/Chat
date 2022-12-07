import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, batch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';
import Modal from './modals/Modal.jsx';
import routes from '../routes';
import { useAuth } from '../hooks/index.jsx';
import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';

const Chat = () => {
  const { getAuthHeader, logOut } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(routes.getDataPath(), { headers: getAuthHeader() });
        batch(() => {
          dispatch(setChannels(data));
          dispatch(setMessages(data));
        });
      } catch (err) {
        toast.warn(`${t('toast.errorLoadingData')}`);
        logOut();
      }
    };

    getData();
  }, [dispatch, getAuthHeader, t]);

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
