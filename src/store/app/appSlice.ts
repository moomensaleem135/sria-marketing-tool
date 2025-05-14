import { createSlice } from '@reduxjs/toolkit';

import { IAppState } from './types';

export const initialState: IAppState = {
  error: '',
  loading: false,
  status: '',
  tabFiles: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearErrors(state: IAppState) {
      state.error = '';
    },
    resetApp: () => {
      return initialState;
    },
    setFiles: (state, { payload }) => {
      // Check if file already exists for this question
      const existingFileIndex = state.tabFiles.findIndex(
        (file) => file.questionId === payload.questionId
      );

      if (existingFileIndex >= 0) {
        // Update existing file
        state.tabFiles[existingFileIndex] = payload;
      } else {
        // Add new file
        state.tabFiles.push(payload);
      }
    },
    // Add a new reducer to remove a file if needed
    removeFile: (state, { payload }) => {
      state.tabFiles = state.tabFiles.filter((file) => file.questionId !== payload.questionId);
    }
  },
  extraReducers: (_builder) => {}
});

export const { clearErrors, resetApp, setFiles, removeFile } = appSlice.actions;

export default appSlice.reducer;
