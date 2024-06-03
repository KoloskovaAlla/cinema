import classes from './FilmInfo.module.scss';
import { useEffect } from 'react';

export const FilmInfo = ({ film }) => {
  useEffect(() => {
    // console.log('test');
    console.log(film);
  }, [film]);

  return (
    <section className={classes.section}>
      <div className={classes.wrapper}>
        <div className={classes.body}>

          <h1 className={classes.title}>
            {film?.Title}
          </h1>

          <p className={classes.copy}>{film?.overview}</p>

          <div className={classes.infoBlock}>
            {/* <p>{`Популярность: ${film?.popularity}`}</p> */}
            <p>{`Год выхода: ${film?.Year}`}</p>
          </div>
        </div>

        <div className={classes.image}>
          <img
            src={film?.Poster}
            alt={film?.title}
          />
        </div>
      </div>
    </section>
  )
};
