import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdd: false,
  isQuestionsContainerOpen: false,
  isSignContainerOpen: false
};

const socialMediaSlice = createSlice({
  name: 'socialMedia',
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

export const { toggleAdd, toggleQuestionsContainer, toggleSignContainer } =
  socialMediaSlice.actions;

export default socialMediaSlice.reducer;
