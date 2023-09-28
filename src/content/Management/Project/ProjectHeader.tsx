import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const headerStyle = {
  height: '300px',
  width: '100%',
  background: 'linear-gradient(to right, #070C27, #3E3A7B)', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const titleStyle = {
  fontSize: '24px', 
  color: 'white', 
};

function ProjectHeader() {
  return (
    <AppBar position="static" sx={headerStyle}>
      <Toolbar>
        <Typography variant="h1" component="div" sx={titleStyle}>
          Your Title
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default ProjectHeader;