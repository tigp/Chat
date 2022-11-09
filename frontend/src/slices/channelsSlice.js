import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [] },
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels.push(...payload);
    },
  },
});

export const { setChannels } = channelsSlice.actions;
export default channelsSlice.reducer;
