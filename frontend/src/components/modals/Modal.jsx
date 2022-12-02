import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { isShow, modalType } = useSelector((state) => state.modalStore);
  const { channels } = useSelector((state) => state.channelsStore);

  const getchannelsNames = channels.map(({ name }) => name);
  const getValidationSchema = (channelsNames) => yup.object().shape({
    nameOfTheChannel: yup
      .string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('errors.min3'))
      .max(20, t('errors.max20'))
      .notOneOf(channelsNames, t('errors.uniqueName')),
  });

  if (!modalType) {
    return null;
  }

  const ModalComponent = mapping[modalType];

  return (
    <BootstrapModal show={isShow} centered onHide={() => dispatch(closeModal())}>
      {ModalComponent && <ModalComponent values={{ getValidationSchema, getchannelsNames }} />}
    </BootstrapModal>
  );
};

export default Modal;
