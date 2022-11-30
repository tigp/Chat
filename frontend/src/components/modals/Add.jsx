import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal as BootstrapModal,
  Form,
  CloseButton,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';

import { closeModal } from '../../slices/modalSlice.js';
import { useApi } from '../../hooks/index.jsx';

const Add = ({ getValidationSchema }) => {
  const dispatch = useDispatch();
  const { addNewChannel } = useApi();
  const { channels } = useSelector((state) => state.channelsStore);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      nameOfTheChannel: '',
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: async ({ nameOfTheChannel }) => {
      try {
        const data = { name: nameOfTheChannel };
        await addNewChannel(data);
        dispatch(closeModal());
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>Создать новый канал</BootstrapModal.Title>
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
              name="nameOfTheChannel"
              autoComplete="nameOfTheChannel"
              required=""
              placeholder="Название канала"
              id="nameOfTheChannel"
            />
            <Form.Label className="visually-hidden" htmlFor="nameOfTheChannel">Название канала</Form.Label>
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
                disabled={!formik.values.nameOfTheChannel && formik.isValid}
                variant="primary"
                type="submit"
              >
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

export default Add;
