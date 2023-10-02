import { useState } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { updateProject } from '@/services/project';
import ClearIcon from '@mui/icons-material/Clear';
import { fetchProjects } from '@/store/slices/project/projectSlice';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/store/slices/notifications/notificationSlice';

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

interface Props {
  id: string;
  title: any;
  currentStatus: string;
}

export default function UpdateProjectModal(props: Props) {
  const { id, title, currentStatus } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newProjectTitle, setNewProjectTitle] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus); // Initialize with the current status
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleNewProjectTitleChange = (event) => {
    setNewProjectTitle(event.target.value);
  };

  const handleProjectUpdate = () => {
    if (newProjectTitle !== '') {
      const regex = /^[A-Za-zА-Яа-я0-9\s]+$/;

      if (regex.test(newProjectTitle)) {
        setLoading(true);
        const body: Object = {
          title: newProjectTitle,
          status: selectedStatus
        };

        updateProject(body, id).then((res) => {
          if (res.success) {
            dispatch(fetchProjects() as any);
            dispatch(
              openNotification({
                isOpen: true,
                text: 'Проекта е успешно променен',
                severity: 'success'
              })
            );
            setLoading(false);
            handleClose();
          } else if (!res.success) {
            console.log('Problem');
          }
        });
      } else {
        setError('Заглавието може да съдържа само букви и цифри');
      }
    } else {
      setError('Моля въведете заглавие на проекта');
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditIcon sx={{ color: '#FFBF00' }} />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.root}>
          <Box sx={styles.header}>
            <Typography sx={{ fontSize: '1.5rem' }}>
              Променете проект: {title}
            </Typography>

            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Box>

          <Box width="100%">
            <Typography sx={{ fontSize: '1.2rem', mb: '1rem' }}>
              Въведете ново заглавие на проекта
            </Typography>

            <TextField
              error={error ? true : false}
              label="Въведете ново заглавие..."
              helperText={error ? error : ''}
              fullWidth
              value={newProjectTitle}
              onChange={handleNewProjectTitleChange}
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select value={selectedStatus} onChange={handleStatusChange}>
              <MenuItem value="Unpaid">Неплатен</MenuItem>
              <MenuItem value="Paid">Платен</MenuItem>
            </Select>
          </FormControl>

          {!loading ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleProjectUpdate}
            >
              Запази
            </Button>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Modal>
    </div>
  );
}
