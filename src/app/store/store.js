import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filmReducer, moviesReducer, similarFilmsReducer } from 'shared/reducers';

const rootReducer = combineReducers({
  filmReducer,
  moviesReducer,
  similarFilmsReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
