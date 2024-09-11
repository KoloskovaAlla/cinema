import { useSelector } from 'react-redux';
import { setSimilarFilms } from 'shared/reducers/similarFilmsSlice';

const getState = (store) => store.similarFilmsReducer;

export const useSimilarFilms = () => {
  const state = useSelector(getState);

  return {
    ...state,
    setSimilarFilms
  };
};
