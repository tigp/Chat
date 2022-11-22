import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import useAuth from '../../hooks/index.jsx';

const MessagesBox = () => {
  const { messages } = useSelector((state) => state.messagesStore);
  const { user } = useAuth();

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.length > 0 && messages.map((message) => (
        <div key={_.uniqueId()} className="text-break mb-2">
          <b>{`${user.username}: `}</b>
          {message}
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
