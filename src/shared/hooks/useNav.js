import { useSelector } from 'react-redux';
import { setIsNavActive } from '../reducers/navSlice';

const getState = (store) => store.navReducer;

export const useNav = () => {
  const state = useSelector(getState);

  return {
    ...state,  
    setIsNavActive,
  };
};
