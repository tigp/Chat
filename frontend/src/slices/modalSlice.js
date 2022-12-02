/* eslint no-param-reassign: "error" */

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isShow: false, modalType: null, channelId: null },
  reducers: {
    openModal: (state, { payload }) => {
      const { type, id } = payload;
      state.isShow = true;
      state.modalType = type;
      state.channelId = id ?? null;
    },
    closeModal: (state) => {
      state.isShow = false;
      state.modalType = null;
      state.channelId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
