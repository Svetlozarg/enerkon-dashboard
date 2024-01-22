import { useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import { useDispatch } from 'react-redux';
import { Project } from '@/services/Projects/apiProjectsTypes';
import { Document } from '@/services/Documents/apiDocumentsTypes';
import { callApi } from '@/services/callApi';
import { createDocument } from '@/services/Documents/apiDocuments';

interface AddDocumentModalContentProps {
  projectsData: Project[];
  setDocumentsData: React.Dispatch<React.SetStateAction<Document[]>>;
  openDocumentModal: boolean;
  setOpenDocumentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddDocumentModalContent: React.FC<AddDocumentModalContentProps> = ({
  projectsData,
  setDocumentsData,
  openDocumentModal,
  setOpenDocumentModal
}) => {
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAddDocument = async () => {
    setError('');

    if (selectedProject === '' || selectedFile === null) {
      if (selectedProject === '') {
        setError('Моля изберете проект');
      } else if (selectedFile === null) {
        setError('Моля добавете документ');
      }
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      await callApi<any>({
        query: createDocument(selectedProject, formData)
      }).then((res) => {
        if (res.success) {
          setDocumentsData((prev) => [...prev, res.data]);
          dispatch(
            openNotification({
              isOpen: true,
              text: 'Документа е успешно създаден',
              severity: 'success'
            })
          );
          setLoading(false);
          setOpenDocumentModal(!openDocumentModal);
        } else if (!res.success) {
          console.log('Problem');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack>
      {!loading ? (
        <Stack direction="column" my={4}>
          <Typography component="p" variant="h4" mb={2} mt={4}>
            Изберете проект
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Изберете проект</InputLabel>
            <Select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              {projectsData.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="body1" component="p" sx={{ color: 'red' }}>
            {error === 'Моля изберете проект' ? error : ''}
          </Typography>

          <Typography component="p" variant="h4" mb={2} mt={4}>
            Документ към проекта
          </Typography>

          {!selectedFile && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button sx={{ border: '1px solid #8C7CF0' }} component="label">
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
          )}

          {selectedFile && (
            <Stack alignItems="flex-start" mt={2}>
              <Tooltip
                title="Изтрий"
                sx={{ cursor: 'pointer' }}
                onClick={() => setSelectedFile(null)}
              >
                <Stack
                  alignItems="center"
                  flexDirection="column"
                  gap="5px"
                  sx={{
                    border: '1px solid',
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
                </Stack>
              </Tooltip>
            </Stack>
          )}

          <Typography variant="body1" component="p" sx={{ color: 'red' }}>
            {error === 'Моля добавете документ' ? error : ''}
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
          onClick={handleAddDocument}
          disabled={loading}
          fullWidth
        >
          Добави
        </Button>
      </Stack>
    </Stack>
  );
};

export default AddDocumentModalContent;
