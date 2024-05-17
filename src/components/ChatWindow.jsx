import React from 'react';
import Message from './Message';

const ChatWindow = ({ messages }) => {
  return (
    <div style={styles.chatWindow}>
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
};

const styles = {
  chatWindow: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
  },
};

export default ChatWindow;