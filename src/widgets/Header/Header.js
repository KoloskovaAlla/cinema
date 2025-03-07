import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Navigation, Burger } from 'features';

export const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>        
        <Link to='/' className={classes.logo}>
          FlickNest 
        </Link>  
        <Navigation />   
        <Burger />
      </div>   
    </header>
  );
};
