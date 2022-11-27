import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isShow: false, modalType: null, channelId: null },
  reducers: {
    openModal: (state, { payload }) => {
      const { type } = payload; // have to add id
      state.isShow = true;
      state.modalType = type;
      // state.channelId = id ?? null;
    },
    closeModal: (state) => {
      state.isShow = false;
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
