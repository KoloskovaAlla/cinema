import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filmReducer, moviesReducer, similarFilmsReducer, navReducer, seriesReducer, kidsFilmsReducer } from 'shared/reducers';

const rootReducer = combineReducers({
  filmReducer,
  moviesReducer,
  similarFilmsReducer,
  navReducer,
  seriesReducer,
  kidsFilmsReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
