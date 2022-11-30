import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal as BootstrapModal,
  CloseButton,
  Button,
} from 'react-bootstrap';

import { closeModal } from '../../slices/modalSlice.js';
import { useApi } from '../../hooks/index.jsx';

const Delete = () => {
  const dispatch = useDispatch();
  const { channelId } = useSelector((state) => state.modalStore);
  const { deleteChannel } = useApi();

  const handleDeleteChannel = async () => {
    await deleteChannel({ id: channelId });
    dispatch(closeModal());
  };

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>Удалить канал</BootstrapModal.Title>
        <CloseButton onClick={() => dispatch(closeModal())} />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end modal-buttons-padding">
          <Button
            className="me-2"
            variant="outline-secondary"
            type="button"
            onClick={() => dispatch(closeModal())}
          >
            Отменить
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleDeleteChannel}
          >
            Удалить
          </Button>
        </div>
      </BootstrapModal.Body>
    </>
  );
};

export default Delete;
