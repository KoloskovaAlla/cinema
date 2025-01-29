import { useSelector } from 'react-redux';
import { getSeries } from 'shared/reducers/seriesSlice';

const getState = (store) => store.seriesReducer;

export const useSeries = () => {
  const state = useSelector(getState);

  // console.log(state);

  return {
    ...state,
    getSeries,
  };
};
