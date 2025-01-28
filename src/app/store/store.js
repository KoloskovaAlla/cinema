import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filmReducer, moviesReducer, similarFilmsReducer, navReducer, seriesReducer } from 'shared/reducers';

const rootReducer = combineReducers({
  filmReducer,
  moviesReducer,
  similarFilmsReducer,
  navReducer,
  seriesReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
