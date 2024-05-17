import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GitHubIcon from '@mui/icons-material/GitHub';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import APIComponent from './api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BrowserRouter as Router } from 'react-router-dom';
import SideNav from './components/SideNav';
import AppRoutes from './Routes';
import MarkdownRenderer from './components/MarkdownRenderer';
import DocumentViewer from './components/DocumentViewer';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the CSS for react-resizable

export default function App() {
  const [mode, setMode] = React.useState('light');
  const [input, setInput] = React.useState('');
  const [responses, setResponses] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [uploadPaneVisible, setUploadPaneVisible] = React.useState(true);
  const [documentViewerVisible, setDocumentViewerVisible] = React.useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  
  const handleSend = async () => {
    if (input.trim() === '') return;
    
    const answer = await handleCompletion(input);
    
    const newResponse = {
      question: input,
      answer: answer,
      sources: 'Some Source' // Adjust this if you have sources
    };

    setResponses((prevResponses) => [...prevResponses, newResponse]);
    setInput('');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSend();
  };

  const handleClearChat = () => {
    setResponses([]);
  };

  const handleSplitButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option) => {
    console.log(option);
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
    setUploadPaneVisible(true); // Show the upload pane when drawer is opened
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setUploadPaneVisible(false); // Hide the upload pane after file is uploaded
    setDocumentViewerVisible(true); // Show the document viewer
  };

  const closeUploadPane = () => {
    setUploadPaneVisible(false);
  };

  const closeDocumentViewer = () => {
    setDocumentViewerVisible(false);
    setFile(null);
    setUploadPaneVisible(true); // Reset the upload pane visibility
    setDrawerOpen(false); // Close the drawer
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleCompletion = async (input) => {
    try {
      const response = await axios.post('http://localhost:8080/api/completion', { input });
  
      console.log('API Response:', response.data); // Log the response for debugging
  
      return response.data.response;
    } catch (error) {
      console.error('Error sending the request', error);
      return 'Error fetching response';
    }
  };
  

  
  const handleUserClick = async (user) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${user}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const options = ['Option 1', 'Option 2', 'Option 3'];

  const renderTable = (data) => {
    const keys = Object.keys(data[0]);

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {keys.map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {keys.map((key) => (
                  <TableCell key={key}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="fixed">
            <Toolbar>
              <SideNav />
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                Chat
              </Typography>
              <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Box sx={{ flexGrow: 1, p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ width: '100%', maxWidth: 800 }}>
                <AppRoutes />
                <Typography variant="body1" gutterBottom>
                  Answer
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" gutterBottom>
                  Related
                </Typography>
                <Box sx={{ my: 2 }}>
                  <ul>
                    <li>How to start a conversation with someone you just met</li>
                    <li>How to make new friends in a new city</li>
                    <li>How to overcome shyness when meeting new people</li>
                  </ul>
                </Box>
                <Divider sx={{ my: 2 }} />
                {responses.map((response, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      <strong>Question:</strong>
                      <MarkdownRenderer content={response.question} />
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Answer:</strong>
                      <MarkdownRenderer content={response.answer} />
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      <strong>Sources:</strong> {response.sources}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    {index === responses.length - 1 && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="outlined" startIcon={<ThumbUpIcon />}>
                          Like
                        </Button>
                        <Button variant="outlined" startIcon={<ThumbDownIcon />}>
                          Dislike
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<GitHubIcon />}
                          onClick={handleSplitButtonClick}
                        >
                          Options
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          {options.map((option) => (
                            <MenuItem
                              key={option}
                              onClick={() => handleMenuItemClick(option)}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
            <ResizableBox
              width={400} // Adjusted width
              height={Infinity}
              minConstraints={[300, Infinity]} // Adjusted min width constraint
              maxConstraints={[700, Infinity]} // Adjusted max width constraint
              axis="x"
              handle={(h) => <span className={`custom-handle custom-handle-${h}`} />}
              handleSize={[8, 8]}
              style={{ borderLeft: '1px solid #ccc', overflowY: 'auto' }}
            >
              <Box sx={{ p: 1, position: 'relative' }}>
                {documentViewerVisible && (
                  <>
                    <IconButton 
                      onClick={closeDocumentViewer} 
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        left: 8, 
                        zIndex: 10, // Ensure the button appears above other elements
                        backgroundColor: 'white', // Optional: add background color to ensure visibility
                        '&:hover': {
                          backgroundColor: 'lightgray', // Optional: change color on hover
                        }
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DocumentViewer file={file} onClose={closeDocumentViewer} />
                  </>
                )}
              </Box>
            </ResizableBox>

          </Box>
          <Drawer
            anchor="right"
            open={drawerOpen && uploadPaneVisible}
            onClose={toggleDrawer(false)}
          >
            <Box
              sx={{ width: 300, p: 2 }}
              role="presentation"
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Upload Document
                </Typography>
                <IconButton onClick={closeUploadPane}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />
              <input
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                id="upload-file"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="upload-file">
                <Button variant="contained" color="primary" component="span" startIcon={<UploadFileIcon />}>
                  Upload File
                </Button>
              </label>
            </Box>
          </Drawer>
          <Box sx={{ p: 2, backgroundColor: 'background.paper', width: '100%', position: 'relative' }}>
            <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', mb: 2, position: 'relative' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: '-80px',  // Adjust this value to move it further up
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'transparent' // Remove background
                }}
              >
                <APIComponent onUserClick={handleUserClick} />
              </Box>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', maxWidth: 800, mx: 'auto', borderRadius: 20, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
                onSubmit={handleFormSubmit}
              >
                <TextareaAutosize
                  minRows={1}
                  maxRows={4}
                  placeholder="Ask follow-up"
                  value={input}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    borderRadius: 20,
                    padding: '12px 16px',
                    border: '1px solid #ccc',
                    outline: 'none',
                    resize: 'none',
                    overflow: 'hidden',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    fontFamily: 'Arial, sans-serif',
                  }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ ml: 1, borderRadius: '50%', minWidth: '48px', minHeight: '48px' }}>
                  <SendIcon />
                </Button>
                <Button onClick={handleClearChat} variant="outlined" color="secondary" sx={{ ml: 1, borderRadius: '50%', minWidth: '48px', minHeight: '48px' }}>
                  <ClearIcon />
                </Button>
              </Paper>
            </Box>
          </Box>
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
            }}
            onClick={toggleDrawer(true)}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
