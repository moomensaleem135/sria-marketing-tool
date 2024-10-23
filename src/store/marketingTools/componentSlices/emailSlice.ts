import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdd: false,
  isQuestionsContainerOpen: false,
  isSignContainerOpen: false
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    toggleAdd: (state) => {
      state.isAdd = !state.isAdd;
    },
    toggleQuestionsContainer: (state) => {
      state.isQuestionsContainerOpen = !state.isQuestionsContainerOpen;
    },
    toggleSignContainer: (state) => {
      state.isSignContainerOpen = !state.isSignContainerOpen;
    }
  }
});

export const { toggleAdd, toggleQuestionsContainer, toggleSignContainer } = emailSlice.actions;

export default emailSlice.reducer;
