import { createSlice } from '@reduxjs/toolkit';

const getSimilarFilmsFromStorage = () => {
  try {
    const similarFilms = localStorage.getItem('similarFilms');
    return similarFilms ? JSON.parse(similarFilms) : [];
  } catch (error) {
    console.error('Error parsing similar films data from localStorage:', error);
    return null;
  }
};


const initialState = {
  similarFilms: getSimilarFilmsFromStorage(),
};

const similarFilmsSlice = createSlice({
  name: 'similarFilms',
  initialState,
  reducers: {
    setSimilarFilms: (state, { payload }) => {
      state.similarFilms = payload;
    },
  },
});

export const { reducer: similarFilmsReducer } = similarFilmsSlice;
export const { setSimilarFilms } = similarFilmsSlice.actions;
