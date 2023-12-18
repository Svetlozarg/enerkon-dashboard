import { forwardRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  IconButton,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import RefreshIcon from '@mui/icons-material/Refresh';
import { recreateProjectDocuments } from '@/services/project';
import { fetchProjects } from '@/store/slices/project/projectSlice';
import { useDispatch } from 'react-redux';
import { openNotification } from '@/store/slices/notifications/notificationSlice';

interface Props {
  id: string;
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

export default function RecreateProjectModal(props: Props) {
  const { id, title } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleRecreateProject = async () => {
    setLoading(true);

    await recreateProjectDocuments(id);

    dispatch(fetchProjects() as any);
    dispatch(
      openNotification({
        isOpen: true,
        text: 'Проекта е успешно изтрит',
        severity: 'success'
      })
    );
    setLoading(false);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Пресъздай проектови файлове">
        <IconButton onClick={handleOpen}>
          <RefreshIcon sx={{ color: '#228B22' }} />
        </IconButton>
      </Tooltip>

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
          Пресъздаване на проект: {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1rem' }}>
            Сигурни ли сте, че искате да пресъздадете документите към този
            проект?
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

          {!loading ? (
            <Button
              variant="contained"
              sx={{ bgcolor: 'red' }}
              onClick={handleRecreateProject}
            >
              Пресъздай
            </Button>
          ) : (
            <CircularProgress />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
