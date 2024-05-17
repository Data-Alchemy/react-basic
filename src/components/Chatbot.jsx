import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import InputBox from './InputBox';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (message) => {
    setMessages([...messages, { sender: 'user', text: message }]);
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    if (message.toLowerCase().includes('hello')) {
      return 'Hi there! How can I assist you today?';
    }
    return "I'm sorry, I didn't understand that.";
  };

  return (
    <div style={styles.chatbotContainer}>
      <ChatWindow messages={messages} />
      <InputBox onSend={handleSend} />
    </div>
  );
};

const styles = {
  chatbotContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    width: '400px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
};

export default Chatbot;