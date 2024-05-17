import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, IconButton, List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import { styled } from '@mui/system';

const ChatBox = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}));

const ChatMessages = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(2),
}));

const ChatInput = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'User' }]);
      setInput('');
    }
  };

  return (
    <ChatBox>
      <ChatHeader>
        <Typography variant="h6">Chat</Typography>
      </ChatHeader>
      <ChatMessages>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <Avatar sx={{ bgcolor: '#673ab7', mr: 2 }}>
                <ChatIcon />
              </Avatar>
              <ListItemText primary={message.sender} secondary={message.text} />
            </ListItem>
          ))}
        </List>
      </ChatMessages>
      <ChatInput>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </ChatInput>
    </ChatBox>
  );
};

export default ChatContainer;
