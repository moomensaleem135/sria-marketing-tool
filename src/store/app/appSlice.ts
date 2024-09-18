import { createSlice } from "@reduxjs/toolkit";
import { IAppState } from "./types";

export const initialState: IAppState = {
  error: "",
  loading: false,
  status: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clearErrors(state: IAppState) {
      state.error = "";
    },
    resetApp: () => {
      return initialState;
    },
  },
  extraReducers: (_builder) => {},
});

export const { clearErrors, resetApp } = appSlice.actions;

export default appSlice.reducer;
