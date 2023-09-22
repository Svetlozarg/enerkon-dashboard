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
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { createProject } from '@/services/project';

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
  const handleClose = () => {
    setProjectName('');
    setError(false);
    setOpen(false);
  };
  const [projectName, setProjectName] = useState<string>('');

  const handleSubmit = () => {
    if (projectName) {
      console.log(projectName);
      console.log(selectedFile);

      const body = {
        title: projectName,
        documents: []
      }

      createProject(body) 
      
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
          Проекти
        </Typography>
        <Typography variant="subtitle2">
          Всички проекти на едно място
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleOpen}
        >
          Добави проект
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Box sx={styles.root}>
            <Typography variant="h3" sx={{ mt: '25px', width: '100%', display: 'flex' , justifyContent: 'center' }}>
                    Добави Проект
                  </Typography>
              <IconButton onClick={handleClose} sx={styles.iconButton}>
                <CloseIcon sx={styles.closeButton} />
              </IconButton>
              
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%',
                    mt: '3rem',
                    gap: '2rem'
                  }}
                >

                  <TextField
                    error={error}
                    label="Име на проекта"
                    helperText={
                      error
                        ? 'Не сте въвели име на проекта'
                        : 'Моля въведете име на проекта'
                    }
                    onChange={handleProjectNameChange}
                    value={projectName}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{}}
                  >
                    <Button  sx={{border: '1px solid #8C7CF0'}} component="label" disabled={selectedFile}>
                      Добави документ
                      <input
                        hidden
                        accept="application/xml,text/xml"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </Stack>
                  {selectedFile && <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Tooltip title="Delete" sx={{cursor: "pointer"}} onClick={() => setSelectedFile(null)}>
                    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px', border: 'solid 1px', p: '10px', borderRadius: '20px', cursor: 'pointer'}}>
                    <InsertDriveFileIcon sx={{fontSize: '32px'}}/>
                    <Typography>{selectedFile?.name}</Typography>
                    <Typography>{(selectedFile?.size / 1048576).toFixed(2) + " " + "MB"}</Typography>
                    </Box>
                    </Tooltip>
                  </Box>}
                  <Box sx={{ display: 'flex', justifyContent: 'center', width:'100%'}}>
              <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 8 }} // Added margin top
                  >
                    Добави проект
                  </Button>
                  </Box>
                </Box>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
