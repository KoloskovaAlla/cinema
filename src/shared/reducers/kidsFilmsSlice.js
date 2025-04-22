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
  return genre.includes('animation') || genre.includes('children');
};

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
    const uniqueFilms = Array.from(uniqueFilmsMap.values()).slice(0, 100);

    // Получить подробности и фильтровать
    const detailedFilms = [];
    for (const film of uniqueFilms) {
      const details = await fetchFilmDetails(film.imdbID);
      if (isKidsGenre(details.genre)) {
        detailedFilms.push({ ...film, ...details });
        if (detailedFilms.length >= 20) break;
      }
    }

    return thunkAPI.fulfillWithValue(detailedFilms);
  } catch (error) {
    const { message } = error;
    console.error(message);
    return thunkAPI.rejectWithValue(message);
  }
};

const getKidsFilms = createAsyncThunk(
  'kidsFilms/getKidsFilms',
  onGetKidsFilms,
);

const initialState = {
  isKidsFilmsLoading: false,
  kidsFilms: null,
  kidsFilmsErrorMessage: '',
};

const kidsFilmsSlice = createSlice({
  name: 'kidsFilms',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getKidsFilms.pending, state => {
        state.isKidsFilmsLoading = true;
        state.kidsFilms = null;
        state.kidsFilmsErrorMessage = '';
      })
      .addCase(getKidsFilms.fulfilled, (state, { payload }) => {
        state.isKidsFilmsLoading = false;
        state.kidsFilms = payload;
        state.kidsFilmsErrorMessage = '';
      })
      .addCase(getKidsFilms.rejected, (state, { payload }) => {
        state.isKidsFilmsLoading = false;
        state.kidsFilms = null;
        state.kidsFilmsErrorMessage = payload;
      });
  }
});

export { getKidsFilms };
export const { reducer: kidsFilmsReducer } = kidsFilmsSlice;
