const getLPTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#673ab7',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#ffffff',
    },
  },
  typography: {
    fontSize: 16, // Set the base font size to 16px
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1.125rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
});

export default getLPTheme;
