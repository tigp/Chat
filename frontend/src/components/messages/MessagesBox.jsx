import React from 'react';
import { useSelector } from 'react-redux';

const MessagesBox = () => {
  const { messages } = useSelector((state) => state.messagesStore);
  // const { currentChannelId } = useSelector((state) => state.channelsStore);
  // [{ name, text, channelId, id },]

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.length > 0 && messages.map(({
        name,
        text,
        id,
      }) => (
        <div key={id} className="text-break mb-2">
          <b>{`${name}: `}</b>
          {text}
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
