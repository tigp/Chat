import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { GoPlus } from 'react-icons/go';

import { openModal } from '../../slices/modalSlice.js';
import Channel from './Channel.jsx';

const Channels = () => {
  const { channels } = useSelector((state) => state.channelsStore);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chatPage.channels')}</span>
        <button
          onClick={() => dispatch(openModal({ type: 'addChannel' }))}
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <GoPlus />
        <span class="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.length > 0
        && channels.map((channel) => <Channel key={channel.id} channel={channel} />)}
      </ul>
    </div>
  );
};

export default Channels;
