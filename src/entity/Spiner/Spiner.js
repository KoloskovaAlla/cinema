import classes from './Spiner.module.scss'
import spiner from './assets/spiner.gif';

export const Spiner = () => {
  return (
    <div className={classes.spiner} >
      <img src={spiner} alt="spiner" />
    </div >

  );
};
