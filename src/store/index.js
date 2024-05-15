import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { filmReducer } from './slices/filmSlice';


const rootReducer = combineReducers({
  filmReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
