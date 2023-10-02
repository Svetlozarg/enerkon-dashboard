import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ClearIcon from '@mui/icons-material/Clear';
import { createDocument } from '@/services/document';
import { getProjects } from '@/services/project';
import { fetchDocuments } from '@/store/slices/document/documentSlice';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';


const styles = {
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '600px',
    height: '550px',
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

export default function AddDocumentModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedFile(null);
    setOpen(false);
  };
  const [error, setError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    if (open) {
      getProjects()
        .then((res) => {
          if (res.success) {
            setProjects(res.data);
          } else {
            console.error('Error fetching projects:', res.error);
          }
        })
        .catch((error) => {
          console.error('Error fetching projects:', error);
        });
    }
  }, [open]);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDocumentCreate = () => {
    if (selectedFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append('projectId', selectedProject);
      formData.append('filename', selectedFile.name);
      formData.append('file', selectedFile);

      createDocument(formData).then((res) => {
        if (res.success) {
          dispatch(fetchDocuments() as any);
          dispatch(
            openNotification({
              isOpen: true,
              text: 'Документа е успешно създаден',
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
      setError('Моля дабавете файл към документа');
    }
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  return (
    <div>
      <Button
        sx={{ mt: { xs: 2, md: 0 } }}
        variant="contained"
        startIcon={<AddTwoToneIcon fontSize="small" />}
        onClick={handleOpen}
      >
        Добави документ
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.root}>
          <Box sx={styles.header}>
            <Typography sx={{ fontSize: '1.5rem' }}>
              Създаване на нов документ
            </Typography>

            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Box>

          <Box width="100%">
            <Typography sx={{ fontSize: '1.2rem', mb: '1rem', mt: '1rem' }}>
              Изберете проект
            </Typography>

            <Select
              value={selectedProject}
              onChange={handleProjectChange}
              fullWidth
            >
              {projects.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.title}
                </MenuItem>
              ))}
            </Select>

            <Typography sx={{ fontSize: '1.2rem', mb: '1rem', mt: '1rem' }}>
              Документ към проекта
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} sx={{}}>
              <Button
                sx={{ border: '1px solid #8C7CF0' }}
                component="label"
                disabled={selectedFile}
              >
                <FileUploadIcon sx={{ color: '#7063C0', mr: '5px' }} />
                Добави документ
                <input
                  hidden
                  accept=".pdf,.xml,.xlsx,.docx,.doc,.csv,.png,.jpg,.jpeg"
                  type="file"
                  onChange={handleFileChange}
                />
              </Button>
            </Stack>
            {selectedFile && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: '1rem'
                }}
              >
                <Tooltip
                  title="Изтрий"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setSelectedFile(null)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      gap: '5px',
                      border: 'solid 1px',
                      p: '10px',
                      borderRadius: '20px',
                      cursor: 'pointer'
                    }}
                  >
                    <InsertDriveFileIcon sx={{ fontSize: '32px' }} />
                    <Typography>{selectedFile?.name}</Typography>
                    <Typography>
                      {(selectedFile?.size / 1048576).toFixed(2) + ' ' + 'MB'}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            )}
          </Box>

          {error ? error : ''}

          {!loading ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDocumentCreate}
            >
              Създай
            </Button>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Modal>
    </div>
  );
}
