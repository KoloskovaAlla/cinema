import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Navigation, Lang, Theme, Burger } from 'features';

export const Header = () => {
  return (
    <header className={classes.header}>
      <Link to='/' className={classes.wrapper}>
        FILM FINDER
      </Link>     
      <Navigation />      
      <Theme />
      <Burger />
    </header>
  );
};
