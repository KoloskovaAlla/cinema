import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {  
  isNavActive: false,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setIsNavActive: (state, { payload }) => {
      state.isNavActive = payload;
    },
  },
});

export const { reducer: navReducer } = navSlice;
export const { setIsNavActive } = navSlice.actions;
