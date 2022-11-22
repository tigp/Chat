import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { TfiArrowRight } from 'react-icons/tfi';

import { addMessage } from '../../slices/messagesSlice.js';
import MessagesBox from './MessagesBox.jsx';

const Messages = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { resetForm }) => {
      dispatch(addMessage(body));
      resetForm();
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># general</b></p>
          <span className="text-muted">0 сообщений</span>
        </div>
        <MessagesBox />
        <div className="mt-auto px-5 py-3">
          <form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                value={formik.values.body}
                onChange={formik.handleChange}
                ref={inputRef}
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
              />
              <button type="submit" className="btn btn-group-vertical">
                <TfiArrowRight />
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
