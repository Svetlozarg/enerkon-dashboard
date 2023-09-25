import { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  TextField,
  Stack,
  Tooltip
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import { createDocument } from '@/services/document';
import { fetchProjects } from '@/store/slices/project/projectSlice';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';



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

  export default function AddDocumentModal() {
    const displatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
    setDocumentTitle('');
    setSelectedFile(null);
    setOpen(false);
  }; 
    const [documentTitle, setDocumentTitle] = useState<string>('');
    const [documentName, setDocumentName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDocumentTitleChange = (event: any) => {
        setDocumentTitle(event.target.value)
    }

    const handleDocumentNameChange = (event: any) => {
        setDocumentName(event.target.value)
    }

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
      };

    const handleDocumentCreate = () => {
        if (documentTitle !== '') {
            const regex = /^[A-Za-zА-Яа-я0-9\s]+$/;

            if (regex.test(documentTitle)) {
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append('title', documentTitle);
                    formData.append('file', selectedFile);

                    createDocument(formData).then((res) => {
                        if(res.success) {
                            // displatch(fetchDocuments() as any)
                            // dispatch(
                            //     openNotification({
                            //       isOpen: true,
                            //       text: 'Проекта е успешно създаден',
                            //       severity: 'success'
                            //     })
                            //   );
                              handleClose();
                        } else if (!res.success) {
                            console.log('Problem');
                        }
                    })
                } else {
                    setError('Моля дабавете xml файл към проекта');
                }
            } else {
                setError('Заглавието може да съдържа само букви и цифри');
              }
        }   else {
            setError('Моля въведете заглавие на проекта');
          }
    }  

  

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
          <Box sx={style}>
            <Box sx={styles.root}>
              <Typography
                variant="h3"
                sx={{
                  mt: '25px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                Добави Документ
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
                    label="Заглавие"
                    helperText={
                      error
                        ? 'Не сте въвели заглавие'
                        : 'Моля въведете заглавие'
                    }
                    onChange={handleDocumentTitleChange}
                    value={documentTitle}
                  />
                  <TextField
                   
                    label="Име на проекта"
                    helperText={
                      error
                        ? 'Не сте въвели име на проекта'
                        : 'Моля въведете име на проекта'
                    }
                    onChange={handleDocumentNameChange}
                    value={documentName}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{}}
                  >
                    <Button
                      sx={{ border: '1px solid #8C7CF0' }}
                      component="label"
                      disabled={selectedFile}
                    >
                      Добави документ
                      <input
                        hidden
                        accept="application/xml,text/xml,application/pdf,image/png"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </Stack>
                  {selectedFile && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip
                        title="Delete"
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
                            {(selectedFile?.size / 1048576).toFixed(2) +
                              ' ' +
                              'MB'}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </Box>
                  )}
                </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 8 }} // Added margin top
                >
                  Добави документ
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
    </div>
  );
}

