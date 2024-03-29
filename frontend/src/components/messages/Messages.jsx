import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { animateScroll } from 'react-scroll';
import { TfiArrowRight } from 'react-icons/tfi';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';

import MessagesBox from './MessagesBox.jsx';
import { useAuth, useApi } from '../../hooks/index.jsx';

const Messages = () => {
  const { t } = useTranslation();

  leoProfanity.loadDictionary('ru');

  const { sendNewMessage } = useApi();
  const { user } = useAuth();
  const { messages } = useSelector((state) => state.messagesStore);
  const { channels, currentChannelId } = useSelector((state) => state.channelsStore);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    animateScroll.scrollToBottom({
      containerId: 'messages-box',
      delay: 0,
      duration: 0,
      smooth: true,
    });
  }, [currentChannelId, messages.length]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }, { resetForm }) => {
      const data = {
        name: user.username,
        text: leoProfanity.clean(body),
        channelId: currentChannelId,
      };

      try {
        await sendNewMessage(data);
        resetForm();
      } catch (err) {
        toast.error(`${t('toast.errorSendingMessage')}`);
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
          <span className="text-muted">
            {t('chatPage.counter.messageCount', { count: countMessagesOfChannel.length })}
          </span>
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
                placeholder={t('chatPage.enterMessage')}
                className="border-0 p-0 ps-2 form-control"
              />
              <button type="submit" className="btn btn-group-vertical" disabled={!formik.dirty}>
                <TfiArrowRight />
                <span className="visually-hidden">{t('chatPage.sendButton')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
