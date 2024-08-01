import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { API_BASE_URL } from 'shared/constants/api';

const onGetMovies = async (_, thunkAPI) => {
  try {  
    const apiKey = '35b2affc';
    const url = `https://www.omdbapi.com/?s=movie&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();  
    if (!data.Search) throw new Error(data.message);
    return thunkAPI.fulfillWithValue(data.Search);
  } catch (error) {
    const { message } = error;
    console.error(message);
    return thunkAPI.rejectWithValue(message);
  };
};

const getMovies = createAsyncThunk(
  'movies/getMovies',
  onGetMovies,
);

const initialState = {
  isLoadingMovies: false,
  movies: null,
  errorMessageMovies: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMovies.pending, state => {
        state.isLoadingMovies = true;
        state.movies = null;
        state.errorMessageMovies = '';
      })
      .addCase(getMovies.fulfilled, (state, { payload }) => {
        state.isLoadingMovies = false;
        state.movies = payload;
        state.errorMessageMovies = '';
      })
      .addCase(getMovies.rejected, (state, { payload }) => {
        state.isLoadingMovies = false;
        state.movies = null;
        state.errorMessageMovies = payload;
      });
  }
});

export { getMovies };
export const { reducer: moviesReducer } = moviesSlice;
