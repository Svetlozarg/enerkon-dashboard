import { Dispatch, SetStateAction, ReactElement } from 'react';
import { Box, Typography, Modal as MUIModal, IconButton } from '@mui/material';
import Button from './Button';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

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

interface ModalProps {
  icon?: React.ReactElement<any | any>;
  modalTitle: string;
  children: ReactElement<{ handleClose: () => void }>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({
  icon,
  modalTitle,
  children,
  open,
  setOpen
}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {icon ? (
        <IconButton onClick={handleOpen}>{icon}</IconButton>
      ) : (
        <Button
          icon={<AddTwoToneIcon fontSize="small" />}
          text={modalTitle}
          onClick={handleOpen}
        />
      )}

      <MUIModal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h3" component="h3">
            {modalTitle}
          </Typography>
          {children}
        </Box>
      </MUIModal>
    </div>
  );
};

export default Modal;
