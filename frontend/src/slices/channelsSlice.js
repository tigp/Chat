/* eslint no-param-reassign: "error" */

import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: 1 },
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
    },
    removeChannel: (state, { payload }) => {
      const filteredChannels = state.channels.filter((channel) => channel.id !== payload.id);
      state.channels = filteredChannels;
      state.currentChannelId = 1;
    },
    renameChannel: (state, { payload }) => {
      const { name, id } = payload;
      const targetChannel = state.channels.find((channel) => channel.id === id);
      targetChannel.name = name;
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
