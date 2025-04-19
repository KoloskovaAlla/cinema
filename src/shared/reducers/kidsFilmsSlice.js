import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from 'shared/constants/api';

// Категории детских фильмов
const categories = [
  'children', 'adventure', 'fairy', 'princess', 'animal', 'dog', 'pony',
  'dinosaur', 'puppy', 'kitten', 'friends', 'toy', 'toys',
  'wonder', 'world', 'space', 'jungle',
];

// Получить список фильмов по категории
const fetchFilmsByCategory = async (category) => {
  const url = `https://www.omdbapi.com/?s=${category}&apikey=${API_KEY}&type=movie&page=1`;
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

// Проверка, подходит ли фильм как детский
const isKidsGenre = (genreString) => {
  if (!genreString || genreString === 'N/A') return false;
  const genre = genreString.toLowerCase();
  // return genre.includes('family') || genre.includes('animation') || genre.includes('children');
  return genre.includes('animation') || genre.includes('children');
};

// Основной thunk
const onGetKidsFilms = async (_, thunkAPI) => {
  try {
    const filmsByCategory = await Promise.all(categories.map(fetchFilmsByCategory));
    const allFilms = filmsByCategory.flat();

    // Удаление дубликатов по imdbID
    const uniqueFilmsMap = new Map();
    allFilms.forEach(film => {
      if (!uniqueFilmsMap.has(film.imdbID)) {
        uniqueFilmsMap.set(film.imdbID, film);
      }
    });
    const uniqueFilms = Array.from(uniqueFilmsMap.values()).slice(0, 100); // до 100 штук для фильтрации

    // Получить подробности и фильтровать
    const detailedFilms = [];
    for (const film of uniqueFilms) {
      const details = await fetchFilmDetails(film.imdbID);
      if (isKidsGenre(details.genre)) {
        detailedFilms.push({ ...film, ...details });
        if (detailedFilms.length >= 20) break; // остановимся после 20 подходящих
      }
    }

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
