import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { updateDocument } from '@/services/document';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import { useDispatch } from 'react-redux';
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

interface UpdateDocumentModalProps {
  documentId: string;
  currentDocumentTitle: string;
  currentDocumentStatus: 'In Process' | 'Canceled' | 'Finished';
  setProjectDocumentsData: React.Dispatch<React.SetStateAction<any>>;
}

const UpdateDocumentModal: React.FC<UpdateDocumentModalProps> = ({
  documentId,
  currentDocumentTitle,
  currentDocumentStatus,
  setProjectDocumentsData
}) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newDocumentTitle, setNewDocumentTitle] =
    useState<string>(currentDocumentTitle);
  const [newDocumentStatus, setNewDocumentStatus] = useState<string>(
    currentDocumentStatus
  );
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpen = () => setOpenModal(true);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleStatusChange = (event: any) => {
    setNewDocumentStatus(event.target.value);
  };

  const handleUpdateDocument = async () => {
    try {
      if (
        currentDocumentTitle === newDocumentTitle &&
        currentDocumentStatus === newDocumentStatus
      ) {
        setError(
          'Моля променете ПОНЕ едно от двете: Заглавие на документ или Статус на документ'
        );
        return;
      }

      setLoading(true);

      const body: Object = {
        title: newDocumentTitle,
        status: newDocumentStatus
      };

      updateDocument(body, documentId).then((res) => {
        if (res.success) {
          setProjectDocumentsData((prevProjectsData) =>
            prevProjectsData.map((project) =>
              project._id === documentId
                ? {
                    ...project,
                    title: newDocumentTitle,
                    status: newDocumentStatus as
                      | 'In Process'
                      | 'Canceled'
                      | 'Finished'
                  }
                : project
            )
          );

          dispatch(
            openNotification({
              isOpen: true,
              text: 'Проектът е успешно променен',
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
                <Typography component="p" variant="h4" mb={2}>
                  Ново заглавие на проекта
                </Typography>

                <TextField
                  label="Заглавие"
                  value={newDocumentTitle}
                  onChange={(e) => setNewDocumentTitle(e.target.value)}
                  disabled
                  fullWidth
                />

                <Typography component="p" variant="h4" mb={2} mt={4}>
                  Статус на документа
                </Typography>

                <FormControl fullWidth>
                  <InputLabel>Статус</InputLabel>
                  <Select
                    value={newDocumentStatus}
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="In process">В процес</MenuItem>
                    <MenuItem value="Canceled">Отказан</MenuItem>
                    <MenuItem value="Finished">Завършен</MenuItem>
                  </Select>
                </FormControl>

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
                onClick={handleUpdateDocument}
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

export default UpdateDocumentModal;
