import classes from './Navigation.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNav, useLang, useTheme } from 'shared/hooks';
import { classNames } from 'shared/utils';

export const Navigation = () => {
  const dispatch = useDispatch();

  const { theme } = useTheme();
  const { lang } = useLang();

  const {
    getNav,
    navItems,
    isNavActive,
    setIsNavActive,
  } = useNav();

  useEffect(() => {
    dispatch(getNav());
  }, [dispatch, getNav, lang]);

  const handleLinkClick = () => {
    isNavActive
      ? dispatch(setIsNavActive(false))
      : dispatch(setIsNavActive(true));
  };

  const menuClassNames = classNames(classes.menu, {
    [classes.active]: isNavActive,
    [classes.dark]: theme === 'dark',
  });

  const getLinkClassName = ({ isActive }) => isActive ? 'active' : '';

  if (!navItems) return null;
  return (
    <nav className={classes.navigation}>
      <ul className={menuClassNames}>
        {navItems.length > 0 &&
          navItems.map((menuItem, index) => (
            <li
              className={classes.item}
              key={index}
            >
              <NavLink
                className={getLinkClassName}
                to={`/${menuItem.target}`}
                onClick={handleLinkClick}
              >
                {menuItem.text}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
};
