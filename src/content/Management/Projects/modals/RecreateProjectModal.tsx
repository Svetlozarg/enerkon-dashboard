import { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  CircularProgress
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { recreateProject } from '@/services/project';
import { fetchProjects } from '@/store/slices/project/projectSlice';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ConstructionIcon from '@mui/icons-material/Construction';
import { AxiosResponse } from 'axios';

interface Props {
  projectTitle: string;
  projectID: string;
}

const styles = {
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '600px',
    height: '600px',
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

export default function RecreatePorjectModal(props: Props) {
  const { projectTitle, projectID } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedFile(null);
    setSelectedFileTwo(null);
    setOpen(false);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileTwo, setSelectedFileTwo] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileTwoChange = (event: any) => {
    setSelectedFileTwo(event.target.files[0]);
  };

  const handleProjectRecreate = async () => {
    if (selectedFile && selectedFileTwo) {
      setLoading(true);
      const formData = new FormData();
      formData.append('files', selectedFile);
      formData.append('files', selectedFileTwo);

      recreateProject(projectID, formData).then(
        (res: AxiosResponse<any, any>) => {
          if (res.data.success) {
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
          } else if (!res.data.success) {
            console.log('Problem');
          }
        }
      );
    } else {
      if (!selectedFile) {
        console.log('Моля дабавете xml файл към проекта');
        dispatch(
          openNotification({
            isOpen: true,
            text: 'Моля добавете XML файл към проекта',
            severity: 'error'
          })
        );
      } else if (!selectedFileTwo) {
        console.log('Моля дабавете Master файл към проекта');
        dispatch(
          openNotification({
            isOpen: true,
            text: 'Моля добавете Master файл към проекта',
            severity: 'error'
          })
        );
      }
    }
  };

  return (
    <div>
      <Tooltip title="Пресъздай проект">
        <IconButton onClick={handleOpen}>
          <ConstructionIcon sx={{ color: '#f4430e' }} />
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.root}>
          <Box sx={styles.header}>
            <Typography sx={{ fontSize: '1.5rem' }}>
              Пресъздай текущият проект: {projectTitle}
            </Typography>

            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Box>

          <Box width="100%">
            <Typography sx={{ fontSize: '1rem' }}>
              Чрез качването на нов XML и Master_file документ, ще се пресъздаде
              текущият проект и ще му се генерират нови КСС, Доклад и Резюме.
            </Typography>

            <Typography sx={{ fontSize: '1.2rem', mb: '1rem', mt: '1rem' }}>
              XML Документ
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} sx={{}}>
              {!selectedFile && (
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
              )}
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
                * Project.xml
              </span>
            </Box>

            <Typography sx={{ fontSize: '1.2rem', mb: '1rem', mt: '1rem' }}>
              Мастър Документ
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} sx={{}}>
              {!selectedFileTwo && (
                <Button
                  sx={{ border: '1px solid #8C7CF0' }}
                  component="label"
                  disabled={selectedFileTwo}
                >
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
                  mt: '1rem'
                }}
              >
                <Tooltip
                  title="Изтрий"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setSelectedFileTwo(null)}
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

            <Box mt="1rem">
              <span style={{ fontSize: '.9rem', color: 'gray' }}>
                * Master_file.xlsx
              </span>
            </Box>
          </Box>

          {!loading ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleProjectRecreate}
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
// ...
