import {useState} from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import { Button, IconButton, TextField } from '@mui/material';
import { updateProject } from '@/services/project';


interface Props {
    id: string
}

export default function UpdateProjectModal(props: Props) {
  const {id} = props  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editedTitle, setEditedTitle] = useState<string>("");

  const handleTextFieldChange = (event) => {
    setEditedTitle(event.target.value);
  };
  

  const handleTitleUpdate = () => {
    if (editedTitle !== '') {
        const body = {
            title: editedTitle,
            documents: []
        }
        updateProject(body, id)
    } 
  }



  return (
    <div>
      <IconButton onClick={handleOpen}>
            <EditIcon sx={{ color: '#FFBF00' }} />
          </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <TextField
                label="Edit Title"
                fullWidth
                value={editedTitle}
                onChange={handleTextFieldChange}
              />
              <Button variant="contained" color="primary" onClick={handleTitleUpdate} >
                Save
              </Button>
            </Box>
      </Modal>
    </div>
  );
}