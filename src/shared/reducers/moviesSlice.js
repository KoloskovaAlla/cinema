import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchMoviesByCategory = async (category) => {
  const apiKey = '35b2affc';
  const url = `https://www.omdbapi.com/?s=${category}&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.Search || [];
};

const onGetMovies = async (_, thunkAPI) => {
  try {
    const apiKey = '35b2affc';
 
    const categories = ['fantasy', 'sci-fi', 'animation', 'adventure', 'romance', 'historical', 'musical'];
    let allMovies = [];
    
    for (const category of categories) {
      // const url = `https://www.omdbapi.com/?s=${category}&apikey=${apiKey}`;
      const url = `https://www.omdbapi.com/?s=${category}&y=2024&apikey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();  
      console.log(data.Search[0]); 
      if (data.Search) {
        allMovies.push(...data.Search);
      }
    }

    // Перемешиваем фильмы
    allMovies.sort(() => Math.random() - 0.5);

    // Запрашиваем детали для каждого фильма
    const moviesWithDetails = await Promise.all(
      allMovies.slice(0, 20).map(async (movie) => { // Ограничение для избежания лимитов API
        const movieDetailsUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
        const movieDetailsResponse = await fetch(movieDetailsUrl);
        const movieDetails = await movieDetailsResponse.json();

        return {
          ...movie,
          genre: movieDetails.Genre || 'N/A',
          year: movieDetails.Year || 'N/A',
          runtime: movieDetails.Runtime || 'N/A',
          country: movieDetails.Country || 'N/A',
          rating: movieDetails.imdbRating || 'N/A',
          actors: movieDetails.Actors || 'N/A',
          director: movieDetails.Director || 'N/A',
          writer: movieDetails.Writer || 'N/A',
          plot: movieDetails.Plot || 'N/A',
        };
      })
    );

    return thunkAPI.fulfillWithValue(moviesWithDetails);
  } catch (error) {
    console.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
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
