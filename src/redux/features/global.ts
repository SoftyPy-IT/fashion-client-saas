import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleMobileFilter: false,
  toggleSidebar: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setToggleMobileFilter: (state, action) => {
      state.toggleMobileFilter = action.payload;
    },

    setToggleSidebar: (state, action) => {
      state.toggleSidebar = action.payload;
    },
  },
});

export const { setToggleMobileFilter, setToggleSidebar } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
