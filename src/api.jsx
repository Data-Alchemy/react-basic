// src/api.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Chip } from '@mui/material';

const APIComponent = ({ onUserClick }) => {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      console.log(response.data.users);
      setArray(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 2, mb: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
      {array.map((user, index) => (
        <Chip
          key={index}
          label={user}
          onClick={() => onUserClick(user)}
          sx={{ cursor: 'pointer' }}
        />
      ))}
    </Box>
  );
};

export default APIComponent;
