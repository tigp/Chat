import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'chats',
  initialState: { channels: [] },
  reducers: {
  },
});

export const { action } = channelsSlice;
export default channelsSlice.reducer;
