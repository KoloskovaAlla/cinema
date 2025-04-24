import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from 'shared/constants/api';

// Ключевые слова для поиска исторических фильмов
const categories = [
    "viking",           // фильмы о викингах
    "medieval",         // фильмы о средневековье
    "samurai",          // фильмы о самураях
    "ancient",          // фильмы о древних цивилизациях
    "war",              // военные фильмы
    "empire",           // фильмы об империях
    "revolution",       // фильмы о революциях
    "kingdom",          // фильмы о королевствах
    "dynasty",          // фильмы о династиях
    "battle",           // фильмы о сражениях
    "conquest",         // фильмы о завоеваниях
    "crusade",          // фильмы о крестовых походах
    "sparta",           // фильмы о Спарте
    "rome",             // фильмы о Риме
    "gladiator",        // фильмы о гладиаторах
    "knight",           // фильмы о рыцарях
    "history",          // исторические фильмы
    "epic",             // эпические фильмы
    "biography",        // биографические фильмы
    "castle",           // фильмы с замками
    "egyptian",         // фильмы о Египте
    "pharaoh",          // фильмы о фараонах
    "napoleon",         // фильмы о Наполеоне
    "caesar",           // фильмы о Цезаре
    "alexander"   
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
// const isKidsGenre = (genreString) => {
//   if (!genreString || genreString === 'N/A') return false;
//   const genre = genreString.toLowerCase();
//   return genre.includes('animation') || genre.includes('children');
// };

const onGetHistoryFilms = async (_, thunkAPI) => {
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
    //   if (isKidsGenre(details.genre)) {
      if (true) {
        detailedFilms.push({ ...film, ...details });
        console.log(film);
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

const getHistoryFilms = createAsyncThunk(
  'historyFilms/getHistoryFilms',
  onGetHistoryFilms,
);

const initialState = {
  isHistoryFilmsLoading: false,
  historyFilms: null,
  historyFilmsErrorMessage: '',
};

const historyFilmsSlice = createSlice({
  name: 'historyFilms',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHistoryFilms.pending, state => {
        state.isHistoryFilmsLoading = true;
        state.historyFilms = null;
        state.historyFilmsErrorMessage = '';
      })
      .addCase(getHistoryFilms.fulfilled, (state, { payload }) => {
        state.isHistoryFilmsLoading = false;
        state.historyFilms = payload;
        state.historyFilmsErrorMessage = '';
      })
      .addCase(getHistoryFilms.rejected, (state, { payload }) => {
        state.isHistoryFilmsLoading = false;
        state.historyFilms = null;
        state.historyFilmsErrorMessage = payload;
      });
  }
});

export { getHistoryFilms };
export const { reducer: historyFilmsReducer } = historyFilmsSlice;
