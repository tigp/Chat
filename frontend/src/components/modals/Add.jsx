import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {
  Modal as BootstrapModal,
  Form,
  CloseButton,
  Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import { closeModal } from '../../slices/modalSlice.js';
import { useApi } from '../../hooks/index.jsx';

const Add = ({ values }) => {
  const { getValidationSchema, getchannelsNames } = values;
  const { addNewChannel } = useApi();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      nameOfTheChannel: '',
    },
    validationSchema: getValidationSchema(getchannelsNames),
    onSubmit: async ({ nameOfTheChannel }) => {
      try {
        const data = { name: nameOfTheChannel };
        await addNewChannel(data);
        dispatch(closeModal());
        toast.success(`${t('toast.createNotification')}`);
      } catch (err) {
        toast.warn(`${t('toast.errorLoadingData')}`);
        console.log(err);
      }
    },
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modalAdd.title')}</BootstrapModal.Title>
        <CloseButton onClick={() => dispatch(closeModal())} />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.nameOfTheChannel}
              ref={inputRef}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.nameOfTheChannel}
              name="nameOfTheChannel"
              autoComplete="nameOfTheChannel"
              required=""
              id="nameOfTheChannel"
            />
            <Form.Label className="visually-hidden" htmlFor="nameOfTheChannel">{t('modalAdd.nameOfChannel')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.nameOfTheChannel}</Form.Control.Feedback>
            <div className="d-flex justify-content-end modal-buttons-padding">
              <Button
                className="me-2"
                variant="outline-secondary"
                type="button"
                onClick={() => dispatch(closeModal())}
              >
                {t('modalAdd.cancelButton')}
              </Button>
              <Button
                disabled={!formik.values.nameOfTheChannel && formik.isValid}
                variant="primary"
                type="submit"
              >
                {t('modalAdd.sendButton')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

export default Add;
