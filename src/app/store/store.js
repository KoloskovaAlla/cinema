import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filmReducer, moviesReducer } from 'shared/reducers';

const rootReducer = combineReducers({
  filmReducer,
  moviesReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
