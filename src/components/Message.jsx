import React from 'react';

const Message = ({ sender, text }) => {
  return (
    <div style={{ ...styles.message, ...(sender === 'user' ? styles.user : styles.bot) }}>
      <p style={styles.text}>{text}</p>
    </div>
  );
};

const styles = {
  message: {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '10px',
    maxWidth: '70%',
  },
  user: {
    backgroundColor: '#e0f7fa',
    alignSelf: 'flex-end',
  },
  bot: {
    backgroundColor: '#ffecb3',
    alignSelf: 'flex-start',
  },
  text: {
    margin: 0,
  },
};

export default Message;