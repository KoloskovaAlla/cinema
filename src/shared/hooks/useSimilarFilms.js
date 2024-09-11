import { useSelector } from 'react-redux';
import { setSimilarFilms } from 'shared/reducers/similarFilms';

const getState = (store) => store.fsimilarFilmsReducer;

export const useSimilarFilms = () => {
  const state = useSelector(getState);

  return {
    ...state,
    setSimilarFilms
  };
};
