import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setFilm } from 'shared/reducers/filmSlice';

const getState = (store) => store.filmReducer;

export const useFilm = () => {
  const state = useSelector(getState);

  const { film } = state;

  return {
    ...state,
    setFilm,
  };
};
