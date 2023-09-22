import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  isOpen: boolean;
  text: string;
  severity: 'info' | 'warning' | 'error' | 'success' | '';
}

const initialState: NotificationState = {
  isOpen: false,
  text: '',
  severity: ''
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    openNotification: (state, action: PayloadAction<NotificationState>) => {
      state.isOpen = true;
      state.text = action.payload.text;
      state.severity = action.payload.severity;
    },
    closeNotification: (state) => {
      state.isOpen = false;
      state.text = '';
      state.severity = '';
    }
  }
});

export const { openNotification, closeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
