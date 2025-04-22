import { useSelector } from 'react-redux';
import { getHistoryFilms } from 'shared/reducers/historyFilmsSlice';

const getState = (store) => store.historyFilmsReducer;

export const useHistoryFilms = () => {
  const state = useSelector(getState);

  return {
    ...state,
    getHistoryFilms,
  };
};
