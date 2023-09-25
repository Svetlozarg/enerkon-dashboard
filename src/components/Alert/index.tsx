import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from '@/store/slices/notifications/notificationSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface RootState {
  notification: {
    isOpen: boolean;
    text: string;
    severity: 'info' | 'warning' | 'error';
  };
}

export default function Notification() {
  const dispatch = useDispatch();
  const { isOpen, text, severity } = useSelector(
    (state: RootState) => state.notification
  );

  const handleClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeNotification());
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose as any}
      >
        <Alert
          onClose={handleClose as any}
          severity={severity}
          sx={{ width: '100%', fontSize: '1rem', color: '#fff' }}
        >
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
