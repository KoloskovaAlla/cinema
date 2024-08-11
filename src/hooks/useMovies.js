import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { getMovies } from 'store/slices/moviesSlice';

const getState = (store) => store.moviesReducer;

export const useMovies = () => {
  const state = useSelector(getState);
  // useEffect(() => {
  //   console.log(state.movies);
  // }, [state]);

  return {
    ...state,
    getMovies,
  };
};
