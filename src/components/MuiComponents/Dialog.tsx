import { useState } from 'react';
import {
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  useTheme,
  IconButton
} from '@mui/material';
import Button from './Button';

interface DialogProps {
  icon?: React.ReactElement<any, any>;
  buttonText: string;
  dialogTitle: string;
  dialogDescription: string;
  onConfirm: () => Promise<void>;
}

const Dialog: React.FC<DialogProps> = ({
  icon,
  buttonText,
  dialogTitle,
  dialogDescription,
  onConfirm
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {icon ? (
        <IconButton onClick={handleOpen}>{icon}</IconButton>
      ) : (
        <Button text={buttonText} onClick={handleOpen} />
      )}

      <MUIDialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: theme.palette.background.paper,
            p: 1,
            border: '2px solid',
            borderColor: 'divider'
          }
        }}
      >
        <DialogTitle fontSize="1.5rem">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText fontSize="1rem">
            {dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button text="Отказ" onClick={handleClose} />
          <Button
            text={buttonText}
            type="error"
            onClick={() => {
              onConfirm();
              handleClose();
            }}
          />
        </DialogActions>
      </MUIDialog>
    </Box>
  );
};

export default Dialog;
