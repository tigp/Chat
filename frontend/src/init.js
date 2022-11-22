import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './components/App.jsx';
import store from './slices/index.js';
// import { addMessage } from './slices/messagesSlice.js';

const runApp = () => {
  const socket = io();

  socket.on('connect', (dataFromServ) => {
    console.log(`we did handmade ${dataFromServ}`);
  });

  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
};

export default runApp;
