import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import notificationSlice from './slices/notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    notification: notificationSlice
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
