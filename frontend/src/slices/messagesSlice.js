import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages.push(...payload.messages);
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
