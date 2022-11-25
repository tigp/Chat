import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './components/App.jsx';
import store from './slices/index.js';
import { ApiContext } from './context/index.jsx';
import { addMessage } from './slices/messagesSlice.js';

const buildApi = (socket) => {
  const sendNewMessage = (message) => {
    socket.volatile.emit('newMessage', message, (responce) => {
      if (responce.status !== 'ok') {
        throw new Error('Network ERROR: cant send the message');
      }
    });
  };

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });

  return {
    sendNewMessage,
  };
};

const runApp = () => {
  const socket = io();
  const chatApi = buildApi(socket);

  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ApiContext.Provider value={chatApi}>
          <App />
        </ApiContext.Provider>
      </Provider>
    </React.StrictMode>,
  );
};

export default runApp;
