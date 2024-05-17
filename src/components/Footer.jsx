import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 2,
        backgroundColor: 'primary.main',
        color: 'white',
        mt: 'auto', // Ensure footer stays at the bottom
      }}
    >
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} Dashboard. All rights reserved.
      </Typography>
    </Box>
  );
}
