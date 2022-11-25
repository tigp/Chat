import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: null },
  reducers: {
    setChannels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    addChannel: (state, { payload }) => { // should push { data?? }
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => { // should pass id
      const filteredChannels = state.channels.filter((channel) => channel.id !== payload);
      state.channels = filteredChannels;
    },
    renameChannel: (state, { payload }) => { // should pass object { id, name ???}
      const index = state.channels.findIndex((channel) => channel.id === payload.id);
      state.channels[index].name = payload.name;
    },
  },
});

export const {
  setChannels,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
