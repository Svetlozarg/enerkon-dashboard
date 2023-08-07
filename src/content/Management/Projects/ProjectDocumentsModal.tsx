import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Tooltip,
  IconButton
} from '@mui/material';
import DocumentsList from './DocumentsList';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: '800px',
  bgcolor: 'background.paper',
  border: '2px solid',
  borderColor: 'divider',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4
};

export default function ProjectDocumentsModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Прегледай всички документи към този проект">
        <Button onClick={handleOpen}>Прегледай</Button>
      </Tooltip>

      <Modal open={open} onClose={handleClose} style={{ margin: '10px' }}>
        <Box sx={style}>
          <Typography variant="h3" component="h4" textAlign="center">
            Документи към ИМЕ НА ПРОЕКТ
          </Typography>

          <DocumentsList />

          <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
            <Tooltip title="Затвори">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
