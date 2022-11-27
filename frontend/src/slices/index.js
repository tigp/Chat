import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesSlice from './messagesSlice';
import modalSlice from './modalSlice';

export default configureStore({
  reducer: {
    channelsStore: channelsReducer,
    messagesStore: messagesSlice,
    modalStore: modalSlice,
  },
});
