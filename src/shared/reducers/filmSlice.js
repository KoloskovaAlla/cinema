import { createSlice } from '@reduxjs/toolkit';

const getFilmFromStorage = () => {
  try {
    const filmData = localStorage.getItem('film');
    return filmData ? JSON.parse(filmData) : null;
  } catch (error) {
    console.error('Error parsing film data from localStorage:', error);
    return null;
  }
};


const initialState = {
  film: getFilmFromStorage(),
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
