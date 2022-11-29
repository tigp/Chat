import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { TfiArrowRight } from 'react-icons/tfi';

import MessagesBox from './MessagesBox.jsx';
import { useAuth, useApi } from '../../hooks/index.jsx';

const Messages = () => {
  const { sendNewMessage } = useApi();
  const { user } = useAuth();
  const { messages } = useSelector((state) => state.messagesStore);
  const { channels, currentChannelId } = useSelector((state) => state.channelsStore);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { resetForm }) => {
      try {
        const data = {
          name: user.username,
          text: body,
          channelId: currentChannelId,
        };
        sendNewMessage(data);
        resetForm();
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });

  const countMessagesOfChannel = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column chat-height">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          {channels
            .filter(({ id }) => id === currentChannelId)
            .map(({ name, id }) => (
              <p key={id} className="m-0">
                <b>
                  {`# ${name}`}
                </b>
              </p>
            ))}
          <span className="text-muted">{countMessagesOfChannel.length}</span>
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
