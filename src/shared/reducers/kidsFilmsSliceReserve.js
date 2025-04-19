import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from 'shared/constants/api';

const onGetKidsFilms = async (_, thunkAPI) => {
  try {
    const apiKey = '35b2affc';
    const  categories = [
      // Общие детские термины
      'children',
      
      // // Жанры детского контента
      'adventure', 'fairy',
      
      // // Персонажи и существа
      'princess', 'animal', 'dog', 'pony', 'dinosaur', 'puppy', 'kitten',
      
      // // Распространенные слова в детских названиях  
      
      // // Позитивные эмоции и темы
      'friends', 'toy', 'toys',
      
      // // Сказочные элементы
      'wonder','world',
      
      // // Природа и времена года
      'space', 'jungle',
    ];
   
    let kidsFilms = [];
    
    for (const category of categories) {
      const url = `https://www.omdbapi.com/?s=${category}&apikey=${apiKey}`;
      // const url = `https://www.omdbapi.com/?s=${category}&API_KEY=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Search) {
        kidsFilms.push(...data.Search);
      }
    }

    // Перемешиваем фильмы
    kidsFilms.sort(() => Math.random() - 0.5);

    // Запрашиваем детали для каждого фильма
    const kidsFilmsWithDetails = await Promise.all(
        kidsFilms.slice(0, 20).map(async (kidsFilm) => { // Ограничение для избежания лимитов API
        const kidsFilmDetailsUrl = `https://www.omdbapi.com/?i=${kidsFilm.imdbID}&apikey=${apiKey}`;
        // const kidsFilmDetailsUrl = `https://www.omdbapi.com/?i=${kidsFilm.imdbID}&API_KEY=${API_KEY}`;
        const kidsFilmDetailsResponse = await fetch(kidsFilmDetailsUrl);
        const kidsFilmDetails = await kidsFilmDetailsResponse.json();         

        return {
          ...kidsFilm,
          genre: kidsFilmDetails.Genre || 'N/A',
          year: kidsFilmDetails.Year || 'N/A',
          runtime: kidsFilmDetails.Runtime || 'N/A',
          country: kidsFilmDetails.Country || 'N/A',
          rating: kidsFilmDetails.imdbRating || 'N/A',
          actors: kidsFilmDetails.Actors || 'N/A',
          director: kidsFilmDetails.Director || 'N/A',
          writer: kidsFilmDetails.Writer || 'N/A',
          plot: kidsFilmDetails.Plot || 'N/A',
        };
      })
    );

    return thunkAPI.fulfillWithValue(kidsFilmsWithDetails);
  } catch (error) {
    console.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
};

const getKidsFilms = createAsyncThunk(
  'movies/getKidsFilms',
  onGetKidsFilms,
);

const initialState = {
  isLoadingMovies: false,
  kidsFilms: null,
  errorMessageMovies: '',
};

const kidsFilmsSlice = createSlice({
  name: 'kidsFilms',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getKidsFilms.pending, state => {
        state.isLoadingMovies = true;
        state.kidsFilms = null;
        state.errorMessageMovies = '';
      })
      .addCase(getKidsFilms.fulfilled, (state, { payload }) => {
        state.isLoadingMovies = false;
        state.kidsFilms = payload;
        state.errorMessageMovies = '';
      })
      .addCase(getKidsFilms.rejected, (state, { payload }) => {
        state.isLoadingMovies = false;
        state.kidsFilms = null;
        state.errorMessageMovies = payload;
      });
  }
});

export { getKidsFilms };
export const { reducer: kidsFilmsReducer } = kidsFilmsSlice;
