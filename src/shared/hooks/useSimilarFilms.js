import { useSelector } from 'react-redux';
import { setSimilarFilms } from 'shared/reducers/similarFilmsSlice';
import { useEffect } from 'react';

const getState = (store) => store.similarFilmsReducer;

export const useSimilarFilms = () => {
  const state = useSelector(getState);

  const { similarFilms } = state;

  useEffect(() => {
    localStorage.setItem('similarFilms', JSON.stringify(similarFilms));
  }, [similarFilms]);

  return {
    ...state,
    setSimilarFilms
  };
};
