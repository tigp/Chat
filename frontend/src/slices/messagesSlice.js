import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: ['test?', ' salut!'] },
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages.push(...payload);
    },
  },
});

export const { setMessages } = messagesSlice; // { getChat, removeChat }
export default messagesSlice.reducer;
