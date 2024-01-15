// slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/store/store';
import { RootState } from '@/store/store';
import { signOut } from '@/services/auth';

interface AuthState {
  id: string | null;
  email: string | null;
  accessToken: string | null;
}

interface AuthResponse {
  id: string;
  email: string;
  accessToken: string;
}

const initialState: AuthState = {
  id: null,
  email: null,
  accessToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userSignInSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    userSignOut: (state) => {
      state.id = null;
      state.email = null;
      state.accessToken = null;
    }
  }
});

export const { userSignInSuccess, userSignOut } = authSlice.actions;

export const signOutUser = (): AppThunk => async (dispatch: any) => {
  try {
    signOut();
    dispatch(userSignOut());
  } catch (error) {
    console.error(error);
  }
};

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
