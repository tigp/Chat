import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { GoPlus } from 'react-icons/go';

import { setActiveChannel } from '../../slices/channelsSlice';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsStore);
  const dispatch = useDispatch();

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <GoPlus />
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.length > 0 && channels.map(({ id, name }) => {
          const classNames = cn('w-100', 'rounded-0', 'text-start', 'btn', {
            'btn-secondary': id === currentChannelId,
          });
          return (
            <li key={id} className="nav-item w-100">
              <button
                onClick={() => dispatch(setActiveChannel(id))}
                type="button"
                className={classNames}
              >
                <span className="me-1">#</span>
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
