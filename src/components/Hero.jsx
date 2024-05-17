import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      sx={{
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main',
        color: 'white',
      }}
    >
      <Typography variant="h2" component="h1">
        Welcome to React Chatbot
      </Typography>
      <Typography variant="h5">
        A simple chatbot built with React and MUI
      </Typography>
    </Box>
  );
}
