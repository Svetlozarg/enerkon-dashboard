import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Modal,
  IconButton
} from '@mui/material';
import { updateProject } from '@/services/project';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import { Project } from '@/services/apiTypes';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%',
  maxWidth: '600px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  border: '2px solid',
  borderColor: 'divider',
  borderRadius: '10px',
  gap: '2rem',
  p: '1.5rem'
};

interface UpdateProjectModalProps {
  projectId: string;
  currentProjectTitle: string;
  currentProjectStatus: 'paid' | 'unpaid';
  setProjectsData: React.Dispatch<React.SetStateAction<Project[]>>;
}

const UpdateProjectModal: React.FC<UpdateProjectModalProps> = ({
  projectId,
  currentProjectTitle,
  currentProjectStatus,
  setProjectsData
}) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newProjectTitle, setNewProjectTitle] =
    useState<string>(currentProjectTitle);
  const [newProjectStatus, setNewProjectStatus] =
    useState<string>(currentProjectStatus);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpen = () => setOpenModal(true);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleNewProjectTitleChange = (event: any) => {
    setNewProjectTitle(event.target.value);
  };

  const handleStatusChange = (event: any) => {
    setNewProjectStatus(event.target.value);
  };

  const handleUpdateProject = async () => {
    setError('');
    try {
      if (
        currentProjectTitle === newProjectTitle &&
        currentProjectStatus === newProjectStatus
      ) {
        setError(
          'Моля променете ПОНЕ едно от двете: Заглавие на проект или Статус на проект'
        );
        return;
      }

      setLoading(true);

      const body: Object = {
        title: newProjectTitle,
        status: newProjectStatus
      };

      updateProject(body, projectId).then((res) => {
        if (res.success) {
          // Update projectsData with new project title and status
          setProjectsData((prevProjectsData) =>
            prevProjectsData.map((project) =>
              project._id === projectId
                ? {
                    ...project,
                    title: newProjectTitle,
                    status: newProjectStatus as 'paid' | 'unpaid'
                  }
                : project
            )
          );

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <EditIcon color="warning" />
      </IconButton>
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={style}>
          <Stack>
            {!loading ? (
              <Stack direction="column" my={4}>
                <Box mb={4}>
                  <Typography component="p" variant="h4" mb="1rem">
                    Ново заглавие на проекта
                  </Typography>

                  <TextField
                    label={''}
                    fullWidth
                    value={newProjectTitle}
                    onChange={handleNewProjectTitleChange}
                  />
                </Box>
                <Box>
                  <Typography component="p" variant="h4" mb="1rem">
                    Статус на проекта
                  </Typography>

                  <FormControl fullWidth>
                    <InputLabel>Статус</InputLabel>
                    <Select
                      value={newProjectStatus}
                      onChange={handleStatusChange}
                    >
                      <MenuItem value="unpaid">Неплатен</MenuItem>
                      <MenuItem value="paid">Платен</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Typography
                  component="p"
                  variant="h4"
                  mt={3}
                  color="error"
                  textAlign="center"
                >
                  {error && (
                    <>
                      {error.split(':').map((line, index) => (
                        <Typography
                          key={index}
                          component="p"
                          variant="h4"
                          mb="1rem"
                        >
                          {index === 0 ? line + ':' : line}
                        </Typography>
                      ))}
                    </>
                  )}
                </Typography>
              </Stack>
            ) : (
              <Stack justifyContent="center" alignItems="center" my={5}>
                <CircularProgress />
              </Stack>
            )}

            <Stack direction="row" gap={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateProject}
                disabled={loading}
                fullWidth
              >
                Запази
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default UpdateProjectModal;
