import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { createProject } from '@/services/project';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import { userEmail } from '@/helpers/GetUser';
import { Project } from '@/services/apiTypes';
import { createDocument } from '@/services/document';

interface AddProjectModalContentProps {
  setProjectsData: React.Dispatch<React.SetStateAction<Project[]>>;
  openProjectModal: boolean;
  setOpenProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProjectModalContent: React.FC<AddProjectModalContentProps> = ({
  setProjectsData,
  openProjectModal,
  setOpenProjectModal
}) => {
  const dispatch = useDispatch();
  const [projectTitle, setProjectTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileTwo, setSelectedFileTwo] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleFileTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFileTwo(file || null);
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
  };

  const handleFileTwoDelete = () => {
    setSelectedFileTwo(null);
  };

  const handleCreateProject = () => {
    setError('');
    if (
      projectTitle === '' ||
      selectedFile === null ||
      selectedFileTwo === null
    ) {
      if (projectTitle === '') {
        setError('Заглавието на проекта не може да бъде празно');
      } else if (selectedFile === null) {
        setError('Моля добавете XML документ');
      } else {
        setError('Моля добавете Мастър документ');
      }
      return;
    } else {
      setLoading(true);
      createProject({ title: projectTitle, owner: userEmail }).then(
        async (res) => {
          if (res.success) {
            const { _id } = res.data;

            const projectXMLDocument = {
              file: selectedFile
            };

            const masterXLSXDocument = {
              file: selectedFileTwo
            };

            await Promise.all([
              createDocument(_id, projectXMLDocument),
              createDocument(_id, masterXLSXDocument)
            ]);

            setProjectsData((prev) => [...prev, res.data]);
            dispatch(
              openNotification({
                isOpen: true,
                text: 'Проекта е успешно създаден',
                severity: 'success'
              })
            );
            setLoading(false);
            setOpenProjectModal(!openProjectModal);
          } else if (!res.success) {
            console.log('Problem');
          }
        }
      );
    }
  };

  return (
    <>
      {!loading ? (
        <>
          <Stack direction="column" my={4}>
            <Typography variant="body1" component="p" fontSize="1rem" mb={2}>
              Заглавие на проекта
            </Typography>
            <TextField
              label="Въведете заглавие..."
              variant="outlined"
              value={projectTitle}
              onChange={handleTitleChange}
              error={
                error &&
                error === 'Заглавието на проекта не може да бъде празно'
                  ? true
                  : false
              }
              helperText={
                error === 'Заглавието на проекта не може да бъде празно'
                  ? error
                  : ''
              }
            />
          </Stack>

          <Stack direction="column" my={4}>
            <Typography variant="body1" component="p" fontSize="1rem">
              XML Документ
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} my={2}>
              {!selectedFile && (
                <Button sx={{ border: '1px solid #8C7CF0' }} component="label">
                  <FileUploadIcon sx={{ color: '#7063C0', mr: '5px' }} />
                  Добави документ
                  <input
                    hidden
                    accept="application/xml,text/xml"
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
              )}
              {selectedFile && (
                <Stack alignItems="center" mt="1rem">
                  <Tooltip
                    title="Изтрий"
                    sx={{ cursor: 'pointer' }}
                    onClick={handleFileDelete}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
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
                </Stack>
              )}
            </Stack>

            <Typography
              variant="body2"
              component="span"
              style={{ fontSize: '.9rem', color: 'gray' }}
            >
              * Project.xml
            </Typography>

            <Typography variant="body1" component="p" sx={{ color: 'red' }}>
              {error === 'Моля добавете XML документ' ? error : ''}
            </Typography>
          </Stack>

          <Stack direction="column" my={4}>
            <Typography variant="body1" component="p" fontSize="1rem">
              Мастър Документ
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} my={2}>
              {!selectedFileTwo && (
                <Button sx={{ border: '1px solid #8C7CF0' }} component="label">
                  <FileUploadIcon sx={{ color: '#7063C0', mr: '5px' }} />
                  Добави документ
                  <input
                    hidden
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    type="file"
                    onChange={handleFileTwoChange}
                  />
                </Button>
              )}
            </Stack>
            {selectedFileTwo && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: '1rem'
                }}
              >
                <Tooltip
                  title="Изтрий"
                  sx={{ cursor: 'pointer' }}
                  onClick={handleFileTwoDelete}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      border: 'solid 1px',
                      p: '10px',
                      borderRadius: '20px',
                      cursor: 'pointer'
                    }}
                  >
                    <InsertDriveFileIcon sx={{ fontSize: '32px' }} />
                    <Typography>{selectedFileTwo?.name}</Typography>
                    <Typography>
                      {(selectedFileTwo?.size / 1048576).toFixed(2) +
                        ' ' +
                        'MB'}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            )}

            <Typography
              variant="body2"
              component="span"
              style={{ fontSize: '.9rem', color: 'gray' }}
            >
              * Master_file.xlsx
            </Typography>

            <Typography variant="body1" component="p" sx={{ color: 'red' }}>
              {error === 'Моля добавете Мастър документ' ? error : ''}
            </Typography>
          </Stack>
        </>
      ) : (
        <Stack justifyContent="center" alignItems="center" my={5}>
          <CircularProgress />
        </Stack>
      )}

      <Stack direction="row" gap={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProject}
          disabled={loading}
          fullWidth
        >
          Създай
        </Button>
      </Stack>
    </>
  );
};

export default AddProjectModalContent;
