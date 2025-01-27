import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filmReducer, moviesReducer, similarFilmsReducer, navReducer } from 'shared/reducers';

const rootReducer = combineReducers({
  filmReducer,
  moviesReducer,
  similarFilmsReducer,
  navReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
