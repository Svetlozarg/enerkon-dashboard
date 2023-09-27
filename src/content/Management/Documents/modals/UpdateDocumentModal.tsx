import React, { useState } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import { Button, IconButton, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';

import { useDispatch } from 'react-redux';
import { openNotification } from '@/store/slices/notifications/notificationSlice';
import { fetchDocuments } from '@/store/slices/document/documentSlice';
import { updateDocument } from '@/services/document';


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

export default function UpdateDocumentModal(props: Props) {
  const { id, title, currentStatus } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newDocumentTitle, setDocumentTitle] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus); // Initialize with the current status
  const [error, setError] = useState<string>('');

  const handleNewDocumentTitleChange = (event) => {
    setDocumentTitle(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleDocumentUpdate = () => {
    if (newDocumentTitle !== '') {
      const regex = /^[A-Za-zА-Яа-я0-9\s]+$/;

      if (regex.test(newDocumentTitle)) {
        const body: Object = {
          title: newDocumentTitle,
          status: selectedStatus, // Update the status
          documents: [] // TODO: Add documents when backend is ready
        };

        updateDocument(body, id).then((res) => {
          if (res.success) {
            dispatch(fetchDocuments() as any);
            dispatch(
              openNotification({
                isOpen: true,
                text: 'Проектът е успешно променен',
                severity: 'success'
              })
            );
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
              Променете документ: {title}
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
              value={newDocumentTitle}
              onChange={handleNewDocumentTitleChange}
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <MenuItem value="In process">В процес</MenuItem>
              <MenuItem value="Canceled">Отказан</MenuItem>
              <MenuItem value="Finished">Завършен</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleDocumentUpdate}
          >
            Запази
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
