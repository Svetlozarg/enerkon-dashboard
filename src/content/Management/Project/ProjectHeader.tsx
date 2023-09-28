import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface Props {
  project: any;
}

const headerStyle = {
  height: '300px',
  width: '100%',
  background: 'linear-gradient(to right, #070C27, #3E3A7B)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const titleStyle = {
  fontSize: '24px',
  color: 'white'
};

function ProjectHeader(props: Props) {
  const { project } = props;

  return (
    <AppBar position="static" sx={headerStyle}>
      <Toolbar>
        <Typography variant="h1" component="div" sx={titleStyle}>
          {project.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default ProjectHeader;
