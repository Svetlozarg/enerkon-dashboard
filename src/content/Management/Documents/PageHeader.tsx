import {
  Typography,
  Button,
  Grid,
  Box,
  Modal,
  IconButton,
  TextField,
  Stack,
  Tooltip
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AddDocumentModal from './modals/AddDocumentModal';

const style = {
  display: 'flex',
  position: 'absolute' as 'absolute',
  top: '50%',
  bgcolor: 'background.paper',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: '800px',
  height: '610px',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: 24,
  borderRadius: '10px',
  overflow: 'hidden',
  justifyContent: 'space-around'
};

const styles = {
  root: {
    width: '100%',
    position: 'relative' // Ensure relative positioning for the IconButton's absolute positioning
  },
  closeButton: {
    fontSize: '2rem',
    color: 'white'
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1 // Ensure the IconButton appears above the modal content
  }
};

function PageHeader() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [error, setError] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');

  const handleClose = () => {
    setProjectName('');
    setError(false);
    setOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (projectName) {
      console.log(projectName);
      console.log(selectedFile);
    } else {
      setError(true);
    }

    handleClose();
  };

  const handleProjectNameChange = (event: any) => {
    setProjectName(event.target.value);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Документи
        </Typography>
        <Typography variant="subtitle2">
          Всички документи на едно място
        </Typography>
      </Grid>
      <Grid item>
        <AddDocumentModal/>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
