import { forwardRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  IconButton
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDocument } from '@/services/document';
import { fetchDocuments } from '@/store/slices/document/documentSlice';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/store/slices/notifications/notificationSlice';

interface Props {
  id: string;
  fileName: string;
  title: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDocumentModal(props: Props) {
  const { id, fileName, title } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDeleteDocument = () => {
    const body: Object = {
      id: id,
      fileName: fileName
    };

    deleteDocument(body)
      .then((res) => {
        if (res.success) {
          dispatch(fetchDocuments() as any);
          dispatch(
            openNotification({
              isOpen: true,
              text: 'Документа е успешно изтрит',
              severity: 'success'
            })
          );
          handleClose();
        } else if (!res.success) {
          console.log('Problem');
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <DeleteIcon sx={{ color: '#dc143c' }} />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          elevation: 0
        }}
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: 'background.paper',
            borderRadius: '10px',
            border: '2px solid',
            borderColor: 'divider',
            p: '1rem'
          }
        }}
      >
        <DialogTitle sx={{ fontSize: '1.2rem' }}>
          Изтриване на проект: {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1rem' }}>
            Сигурни ли сте, че искате да изтриете този проект?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ bgcolor: 'green' }}
            onClick={handleClose}
          >
            Отказ
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: 'red' }}
            onClick={handleDeleteDocument}
          >
            Изтрий
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
