import React from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { setActiveChannel } from '../../slices/channelsSlice';
import { openModal } from '../../slices/modalSlice.js';

const Channel = ({ channel }) => {
  const { id, name, removable } = channel;
  const { currentChannelId } = useSelector((state) => state.channelsStore);
  const dispatch = useDispatch();

  return (
    <li key={id} className="nav-item w-100">
      {removable
        ? (
          <Dropdown as={ButtonGroup} className="d-flex" drop="end">
            <button
              onClick={() => dispatch(setActiveChannel(id))}
              type="button"
              className={cn('w-100', 'rounded-0', 'text-start', 'btn', 'text-truncate', {
                'btn-secondary': id === currentChannelId,
              })}
            >
              <span className="me-1">#</span>
              {name}
            </button>
            <Dropdown.Toggle
              split
              className="flex-grow-0"
              variant={id === currentChannelId ? 'secondary' : null}
            >
              <span className="visually-hidden">Управление каналом</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renameChannel', id }))}>Переименовать</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => dispatch(openModal({ type: 'deleteChannel', id }))}>Удалить</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : (
          <button
            onClick={() => dispatch(setActiveChannel(id))}
            type="button"
            className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
              'btn-secondary': id === currentChannelId,
            })}
          >
            <span className="me-1">#</span>
            {name}
          </button>
        )}
    </li>
  );
};

export default Channel;
