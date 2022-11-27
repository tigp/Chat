import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal as BootstrapModal,
  Form,
  CloseButton,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';

import { closeModal } from '../../slices/modalSlice.js';

const Add = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    // inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      nameOfTheChannel: '',
    },
    // add validation later
    onSubmit: ({ nameOfTheChannel }) => { // have to use async
      console.log(nameOfTheChannel);
    },
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>Создать новый канал</BootstrapModal.Title>
        <CloseButton onClick={() => dispatch(closeModal())} />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={formik.onSubmit}>
          <Form.Group>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.nameOfTheChannel}
              ref={inputRef}
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
