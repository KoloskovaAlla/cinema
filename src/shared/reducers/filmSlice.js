import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  film: null,
};

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setFilm: (state, { payload }) => {
      state.film = payload;
    },

  },
});

export const { reducer: filmReducer } = filmSlice;
export const { setFilm } = filmSlice.actions;
