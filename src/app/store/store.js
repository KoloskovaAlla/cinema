import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { 
  filmReducer, 
  moviesReducer, 
  similarFilmsReducer, 
  navReducer, 
  seriesReducer, 
  kidsFilmsReducer, 
  historyFilmsReducer, 
} from 'shared/reducers';

const rootReducer = combineReducers({
  filmReducer,
  moviesReducer,
  similarFilmsReducer,
  navReducer,
  seriesReducer,
  kidsFilmsReducer,
  historyFilmsReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
