import classes from './Burger.module.scss';
import { useDispatch } from 'react-redux';
import { useNav } from 'shared/hooks';
import { classNames } from 'shared/utils';

/**
 * @function Burger
 * @returns {null | JSX.Element}
 */

export const Burger = () => {
  const dispatch = useDispatch();

  const { isNavActive, setIsNavActive } = useNav();

  const burgerClassNames = classNames(classes.burger, {
    [classes.active]: isNavActive,
  });

  const handleBurgerClick = () => {
    dispatch(setIsNavActive(!isNavActive));
  };

  return (
    <button
      className={burgerClassNames}
      onClick={handleBurgerClick}
    >
      <span />
    </button>
  );
};
