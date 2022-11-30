import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

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

  const getValidationSchema = (channels) => yup.object().shape({
    nameOfTheChannel: yup
      .string()
      .min(3, 'must be at least 3 characters long')
      .max(10, 'the length should be no more than 10 characters')
      .notOneOf(channels, 'name of the channel have to unique'),
  });

  if (!modalType) {
    return null;
  }

  const ModalComponent = mapping[modalType];

  return (
    <BootstrapModal show={isShow} centered onHide={() => dispatch(closeModal())}>
      {ModalComponent && <ModalComponent getValidationSchema={getValidationSchema} />}
    </BootstrapModal>
  );
};

export default Modal;
