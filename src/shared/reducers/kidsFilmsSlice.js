import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from 'shared/constants/api';

// Категории детских фильмов
const categories = [
  // Общие термины
  'children',

  // Жанры
  'adventure', 'fairy',

  // Персонажи
  'princess', 'animal', 'dog', 'pony', 'dinosaur', 'puppy', 'kitten',

  // Эмоции и предметы
  'friends', 'toy', 'toys',

  // Сказочные элементы
  'wonder', 'world',

  // Природа
  'space', 'jungle',
];

// Получить список фильмов по категории
const fetchFilmsByCategory = async (category) => {
  const url = `https://www.omdbapi.com/?s=${category}&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.Search || [];
};

// Получить подробности по одному фильму
const fetchFilmDetails = async (imdbID) => {
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    genre: data.Genre || 'N/A',
    year: data.Year || 'N/A',
    runtime: data.Runtime || 'N/A',
    country: data.Country || 'N/A',
    rating: data.imdbRating || 'N/A',
    actors: data.Actors || 'N/A',
    director: data.Director || 'N/A',
    writer: data.Writer || 'N/A',
    plot: data.Plot || 'N/A',
  };
};

// Основной thunk
const onGetKidsFilms = async (_, thunkAPI) => {
  try {
    const filmsByCategory = await Promise.all(categories.map(fetchFilmsByCategory));
    const allFilms = filmsByCategory.flat();
    const shuffled = allFilms.sort(() => Math.random() - 0.5).slice(0, 20);

    const detailedFilms = await Promise.all(
      shuffled.map(async (film) => ({
        ...film,
        ...(await fetchFilmDetails(film.imdbID)),
      }))
    );

    return thunkAPI.fulfillWithValue(detailedFilms);
  } catch (error) {
    console.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
};

const getKidsFilms = createAsyncThunk('movies/getKidsFilms', onGetKidsFilms);

const initialState = {
  isLoadingKidsFilms: false,
  kidsFilms: null,
  errorKidsFilms: '',
};

const kidsFilmsSlice = createSlice({
  name: 'kidsFilms',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getKidsFilms.pending, state => {
        state.isLoadingKidsFilms = true;
        state.kidsFilms = null;
        state.errorKidsFilms = '';
      })
      .addCase(getKidsFilms.fulfilled, (state, { payload }) => {
        state.isLoadingKidsFilms = false;
        state.kidsFilms = payload;
        state.errorKidsFilms = '';
      })
      .addCase(getKidsFilms.rejected, (state, { payload }) => {
        state.isLoadingKidsFilms = false;
        state.kidsFilms = null;
        state.errorKidsFilms = payload;
      });
  }
});

export { getKidsFilms };
export const { reducer: kidsFilmsReducer } = kidsFilmsSlice;
