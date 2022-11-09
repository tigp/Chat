import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesSlice from './messagesSlice';

export default configureStore({
  reducer: {
    channelsStore: channelsReducer,
    messagesStore: messagesSlice,
  },
});
