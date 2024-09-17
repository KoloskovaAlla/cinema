import { useEffect } from 'react';
import classes from './FilmInfo.module.scss';

export const FilmInfo = ({ film }) => {
  const excludedKeys = ['Poster', 'Title', 'Type', 'Year', 'imdbID', 'plot'];

  useEffect(() => {
    console.log(film);
  }, [film]);

  if (!film) return;
  return (
    <section className={classes.section}>
      <div className={classes.wrapper}>
        <div className={classes.image}>
          <img
            src={film?.Poster}
            alt={film?.title}
          />
        </div>
        <div className={classes.body}>
          <h1 className={classes.title}>
            {film?.Title}
          </h1>

          <div className={classes.infoBlock}>
            {Object.keys(film).map((key, index) => (
              !excludedKeys.includes(key) && (
                <div className={classes.infoItem} key={index}>
                  <div className={classes.infoLabel}>{key.toUpperCase()}</div>
                  <div className={classes.infoValue}>{film[key]}</div>
                </div>
              )
            ))}
            <div><p className={classes.copy}>{film?.plot}</p></div>
          </div>

        </div>
        <div className={classes.rating}>
          <div>
            {film.rating.toUpperCase()}
          </div>
          <div className={classes.countBlock}>{Math.floor(Math.random() * (10000 - 10 + 1)) + 10} ratings</div>
          <button
            className={classes.button}
            // onClick={handleOrderClick}
            type="button"
          >
            Rate the film
          </button>
        </div>
      </div>
    </section>
  )
};
