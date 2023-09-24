import { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  TextField
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ClearIcon from '@mui/icons-material/Clear';
import { createProject } from '@/services/project';
import { fetchProjects } from '@/store/slices/project/projectSlice';
import { useDispatch } from 'react-redux';

const styles = {
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '600px',
    height: '400px',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: '2px solid',
    borderColor: 'divider',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '2rem',
    p: '1.5rem'
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};

export default function AddProjectModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [projectTitle, setProjectTitle] = useState<string>('');

  const handleProjectTitleChange = (event) => {
    setProjectTitle(event.target.value);
  };

  const handleProjectCreate = () => {
    if (projectTitle !== '') {
      const regex = /^[A-Za-zА-Яа-я0-9\s]+$/;

      if (regex.test(projectTitle)) {
        const body: Object = {
          title: projectTitle,
          documents: [] // TODO: Add documents when backend ready
        };

        createProject(body).then((res) => {
          if (res.success) {
            dispatch(fetchProjects() as any);
            handleClose();
          } else if (!res.success) {
            console.log('Problem');
          }
        });
      } else {
        console.log('String contains other characters.');
      }
    }
  };

  return (
    <div>
      <Button
        sx={{ mt: { xs: 2, md: 0 } }}
        variant="contained"
        startIcon={<AddTwoToneIcon fontSize="small" />}
        onClick={handleOpen}
      >
        Добави проект
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.root}>
          <Box sx={styles.header}>
            <Typography sx={{ fontSize: '1.5rem' }}>
              Създаване на нов проект
            </Typography>

            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Box>

          <Box width="100%">
            <Typography sx={{ fontSize: '1.2rem', mb: '1rem' }}>
              Заглавие на проекта
            </Typography>

            <TextField
              label="Въведете заглавие..."
              fullWidth
              value={projectTitle}
              onChange={handleProjectTitleChange}
            />

            <Typography sx={{ fontSize: '1.2rem', mb: '1rem', mt: '1rem' }}>
              Документи към проекта
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleProjectCreate}
          >
            Създай
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
