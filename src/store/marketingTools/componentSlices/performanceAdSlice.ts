import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdd: false,
  isQuestionsContainerOpen: false,
  isSignContainerOpen: false
};

const performanceAdSlice = createSlice({
  name: 'performanceAd',
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
  performanceAdSlice.actions;

export default performanceAdSlice.reducer;
