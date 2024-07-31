import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filmReducer, moviesReducer } from './slices';

const rootReducer = combineReducers({
  filmReducer,
  moviesReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
