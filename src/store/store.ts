import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from './slices/auth/authSlice';
import notificationSlice from './slices/notifications/notificationSlice';
import projectSlice from './slices/project/projectSlice';
import documentSlice from './slices/document/documentSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    notification: notificationSlice,
    project: projectSlice,
    document: documentSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;