import classes from './FilmInfo.module.scss';

export const FilmInfo = ({ film }) => {
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
            <p>{film?.genre}</p>
            <p>{`Year: ${film?.Year}`}</p>
            <p>{`Country: ${film?.country}`}</p>
            <p>{`Rating: ${film?.rating}`}</p>
            <p>{`Actors: ${film?.actors}`}</p>
          </div>
          <p className={classes.copy}>{film?.plot}</p>
        </div>
      </div>
    </section>
  )
};
