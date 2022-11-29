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
    setActiveChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    },
    removeChannel: (state, { payload }) => {
      const filteredChannels = state.channels.filter((channel) => channel.id !== payload.id);
      state.channels = filteredChannels;
      state.currentChannelId = 1;
    },
    renameChannel: (state, { payload }) => { // should pass object { id, name ???}
      const index = state.channels.findIndex((channel) => channel.id === payload.id);
      state.channels[index].name = payload.name;
    },
  },
});

export const {
  setChannels,
  setActiveChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
