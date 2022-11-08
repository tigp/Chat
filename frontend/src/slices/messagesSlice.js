import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
  },
});

export const { action } = messagesSlice;
export default messagesSlice.reducer;
