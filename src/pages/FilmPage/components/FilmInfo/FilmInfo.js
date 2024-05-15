import classes from './FilmInfo.module.scss';

export const FilmInfo = ({ film }) => {
  return (
    <section className={classes.section}>
      <div className={classes.wrapper}>
        <div className={classes.body}>

          <h1 className={classes.title}>
            {film?.title}
          </h1>

          <p className={classes.copy}>{film?.overview}</p>

          <div className={classes.infoBlock}>
            <p>{`Популярность: ${film?.popularity}`}</p>
            <p>{`Дата выхода: ${film?.release_date}`}</p>
          </div>
        </div>

        <div className={classes.image}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${film?.poster_path}`}
            alt={film?.title}
          />
        </div>
      </div>
    </section>
  )
};
