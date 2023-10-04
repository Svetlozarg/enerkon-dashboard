import { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  TextField,
  Stack,
  Tooltip,
  CircularProgress
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ClearIcon from '@mui/icons-material/Clear';
import { createProject } from '@/services/project';
import { fetchProjects } from '@/store/slices/project/projectSlice';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { generateKCCTemplate } from '@/services/document';

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

export default function AddProjectModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setProjectTitle('');
    setSelectedFile(null);
    setOpen(false);
  };
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleProjectTitleChange = (event: any) => {
    setProjectTitle(event.target.value);
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleProjectCreate = async () => {
    if (projectTitle !== '') {
      const regex = /^[A-Za-zА-Яа-я0-9\s]+$/;

      if (regex.test(projectTitle)) {
        if (selectedFile) {
          setLoading(true);
          const formData = new FormData();
          formData.append('title', projectTitle);
          formData.append('file', selectedFile);

          const response = await fetch(
            'https://ik.imagekit.io/obelussoft/Enerkon/kcc.xlsx'
          );
          const blob = await response.blob();

          // Create a new File object from the blob
          const file = new File([blob], 'kcc.xlsx');

          const kccFormData = new FormData();
          kccFormData.append('file', file);

          generateKCCTemplate(kccFormData);

          createProject(formData).then((res) => {
            if (res.success) {
              dispatch(fetchProjects() as any);
              dispatch(
                openNotification({
                  isOpen: true,
                  text: 'Проекта е успешно създаден',
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
          setError('Моля дабавете xml файл към проекта');
        }
      } else {
        setError('Заглавието може да съдържа само букви и цифри');
      }
    } else {
      setError('Моля въведете заглавие на проекта');
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
              error={error ? true : false}
              label="Въведете заглавие..."
              helperText={error ? error : ''}
              fullWidth
              value={projectTitle}
              onChange={handleProjectTitleChange}
            />

            <Typography sx={{ fontSize: '1.2rem', mb: '1rem', mt: '1rem' }}>
              Документи към проекта
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
                  accept="application/xml,text/xml"
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

            <Box mt="1rem">
              <span style={{ fontSize: '.9rem', color: 'gray' }}>
                * Project.xml и Master_file.xlsx
              </span>
            </Box>
          </Box>

          {!loading ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleProjectCreate}
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
