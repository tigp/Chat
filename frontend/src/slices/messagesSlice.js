import { createSlice } from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = [...payload.messages];
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const { id } = payload;
      state.messages = state.messages.filter(({ channelId }) => channelId !== id);
    });
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
