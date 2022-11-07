import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import store from './slices/index.js';

const root = ReactDOM.createRoot(document.querySelector('#chat'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
