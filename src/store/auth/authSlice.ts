import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { UserState, User, ILoginRequest } from './types';
import { loginService } from '../../services/auth/loginService';
import { getCookie } from '@/components/pages-partials/home';
import Cookies from 'js-cookie';
export const signIn = createAsyncThunk('users/login', async (requestData: ILoginRequest) => {
  return await loginService(requestData);
});

const getInitialValues = () => {
  let user = {} as User | string | undefined;
  let token = '' as string;
  let isAuthenticated = false;
  if (typeof window !== 'undefined') {
    const localStorageUser = Cookies.get('user'); // => undefined;
    if (localStorageUser) {
      user = localStorageUser;
      isAuthenticated = true;
    }
    const localStorageToken = Cookies.get('token') as string;
    if (localStorageToken) {
      token = localStorageToken;
    }
  }

  return {
    user,
    token,
    isAuthenticated
  };
};

export const initialState: UserState = {
  user: getInitialValues().user,
  token: getInitialValues().token,
  isAuthenticated: getInitialValues().isAuthenticated,
  status: '',
  error: '',
  isNavigated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state: UserState, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
    setToken(state: UserState, { payload }: PayloadAction<string>) {
      state.token = payload;
    },
    clearError(state: UserState) {
      state.error = '';
    },
    resetUser: () => {
      return initialState;
    },
    resetStatus: (state: UserState) => {
      state.status = '';
    },
    setIsNavigated(state: UserState, { payload }: PayloadAction<boolean>) {
      state.isNavigated = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(signIn.rejected, (state, { error }) => {
      state.status = 'rejected';
      state.isAuthenticated = false;
      state.error = error.message;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    });
  }
});

export const { resetUser, setUser, setToken, clearError, resetStatus, setIsNavigated } =
  authSlice.actions;

export default authSlice.reducer;
