import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Modal as BootstrapModal,
  CloseButton,
  Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import { closeModal } from '../../slices/modalSlice.js';
import { useApi } from '../../hooks/index.jsx';

const Delete = () => {
  const dispatch = useDispatch();
  const { channelId } = useSelector((state) => state.modalStore);
  const { deleteChannel } = useApi();
  const { t } = useTranslation();

  const handleDeleteChannel = async () => {
    await deleteChannel({ id: channelId });
    toast.success(`${t('toast.deleteNotification')}`);
    dispatch(closeModal());
  };

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modalDelete.title')}</BootstrapModal.Title>
        <CloseButton onClick={() => dispatch(closeModal())} />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p className="lead">{t('modalDelete.body')}</p>
        <div className="d-flex justify-content-end modal-buttons-padding">
          <Button
            className="me-2"
            variant="outline-secondary"
            type="button"
            onClick={() => dispatch(closeModal())}
          >
            {t('modalDelete.cancelButton')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleDeleteChannel}
          >
            {t('modalDelete.deleteButton')}
          </Button>
        </div>
      </BootstrapModal.Body>
    </>
  );
};

export default Delete;
