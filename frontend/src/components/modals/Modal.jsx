import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Add from './Add.jsx';
import Delete from './Delete.jsx';
import Rename from './Rename.jsx';
import { closeModal } from '../../slices/modalSlice.js';

const mapping = {
  addChannel: Add,
  deleteChannel: Delete,
  renameChannel: Rename,
};

const Modal = () => {
  const dispatch = useDispatch();
  const { isShow, modalType } = useSelector((state) => state.modalStore);

  if (!modalType) {
    return null;
  }

  const ModalComponent = mapping[modalType];

  return (
    <BootstrapModal show={isShow} centered onHide={() => dispatch(closeModal())}>
      {ModalComponent && <ModalComponent />}
    </BootstrapModal>
  );
};

export default Modal;
