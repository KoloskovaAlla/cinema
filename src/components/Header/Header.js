import classes from './Header.module.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={classes.header}>
      <Link to='/' className={classes.wrapper}>
        КИНОСПРАВОЧНИК
      </Link>
    </header>
  );
};
