import { useSelector } from 'react-redux';
import { getMovies } from 'shared/reducers/moviesSlice';

const getState = (store) => store.moviesReducer;

export const useMovies = () => {
  const state = useSelector(getState);

  return {
    ...state,
    getMovies,
  };
};
