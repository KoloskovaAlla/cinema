import { useSelector } from 'react-redux';
import { setFilm } from 'store/slices/filmSlice';

const getState = (store) => store.filmReducer;

export const useFilm = () => {
  const state = useSelector(getState);

  return {
    ...state,
    setFilm,
  };
};
