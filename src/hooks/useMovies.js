import { useSelector } from 'react-redux';
import { getMovies } from 'store/slices/moviesSlice';

const getState = (store) => store.moviesReducer;

export const useMovies = () => {
  const state = useSelector(getState);

  return {
    ...state,
    getMovies,
  };
};
