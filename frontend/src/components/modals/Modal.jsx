import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Add from './Add.jsx';
// import Remove from './Remove.jsx';
// import Rename from './Rename.jsx';

const mapping = {
  adding: Add,
  // removing: Remove,
  // renameing: Rename,
};

const Modal = () => {
  const { isShow, modalType } = useSelector((state) => state.modalStore);

  if (!modalType) {
    return null;
  }

  const ModalComponent = mapping[modalType];
  return (
    <BootstrapModal show={isShow} centered>
      {ModalComponent && <ModalComponent />}
    </BootstrapModal>
  );
};

export default Modal;
