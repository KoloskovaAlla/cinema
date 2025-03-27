import { useSelector } from 'react-redux';
import { getKidsFilms } from 'shared/reducers/kidsFilmsSlice';

const getState = (store) => store.kidsFilmsReducer;

export const useKidsFilms = () => {
  const state = useSelector(getState);

  return {
    ...state,
    getKidsFilms,
  };
};
