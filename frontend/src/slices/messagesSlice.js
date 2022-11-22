import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessages: (state, { payload }) => {
      state.messages.push(...payload.messages);
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
});

export const { addMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
