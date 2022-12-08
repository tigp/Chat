import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import App from './components/App.jsx';
import store from './slices/index.js';
import { ApiContext } from './context/index.jsx';
import { addMessage } from './slices/messagesSlice.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
  setActiveChannel,
} from './slices/channelsSlice.js';
import resources from './locales/index.js';

const buildApi = (socket) => {
  const sendNewMessage = (message) => {
    socket.volatile.emit('newMessage', message, (responce) => {
      if (responce.status !== 'ok') {
        throw new Error('Network ERROR: can\'t send the message');
      }
    });
  };

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });

  const addNewChannel = (channel) => {
    socket.volatile.emit('newChannel', channel, ({ data, status }) => {
      store.dispatch(setActiveChannel(data.id));
      if (status !== 'ok') {
        throw new Error('Network ERROR: can\'t create the channel');
      }
    });
  };

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });

  const deleteChannel = (channel) => {
    socket.volatile.emit('removeChannel', channel, (responce) => {
      if (responce.status !== 'ok') {
        throw new Error('Network ERROR: can\'t remove the channel');
      }
    });
  };

  socket.on('removeChannel', (id) => {
    store.dispatch(removeChannel(id));
  });

  const renameChannelName = (data) => {
    socket.volatile.emit('renameChannel', data, (responce) => {
      if (responce.status !== 'ok') {
        throw new Error('Network ERROR: can\'t remove the channel');
      }
    });
  };

  socket.on('renameChannel', (id) => {
    store.dispatch(renameChannel(id));
  });

  return {
    sendNewMessage,
    addNewChannel,
    deleteChannel,
    renameChannelName,
  };
};

const runApp = async () => {
  const socket = io();
  const chatApi = buildApi(socket);

  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      resources,
      debug: false,
    });

  const { REACT_APP_ROLLBAR_ACCES_TOKEN } = process.env;
  const rollbarConfig = {
    accessToken: REACT_APP_ROLLBAR_ACCES_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <ApiContext.Provider value={chatApi}>
              <I18nextProvider i18n={i18n}>
                <App />
              </I18nextProvider>
            </ApiContext.Provider>
          </ErrorBoundary>
        </RollbarProvider>
      </Provider>
    </React.StrictMode>,
  );
};

export default runApp;
