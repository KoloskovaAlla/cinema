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
            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>
                Genre
              </div>
              <div className={classes.infoValue}>
                {film?.genre}
              </div>
            </div>
            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>
                Year
              </div>
              <div className={classes.infoValue}>
                {film?.Year}
              </div>
            </div>
            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>
                Runtime
              </div>
              <div className={classes.infoValue}>
                {film?.runtime}
              </div>
            </div>

            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>
                Country
              </div>
              <div className={classes.infoValue}>
                {film?.country}
              </div>
            </div>

            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>
                Rating
              </div>
              <div className={classes.infoValue}>
                {film?.rating}
              </div>
            </div>

            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>
                Actors
              </div>
              <div className={classes.infoValue}>
                {film?.actors}
              </div>
            </div>

            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>
                Director
              </div>
              <div className={classes.infoValue}>
                {film?.director}
              </div>
            </div>
            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>
                Writer
              </div>
              <div className={classes.infoValue}>
                {film?.writer}
              </div>
            </div>

            {/* <p>{`Genre: ${film?.genre}`}</p>
            <p>{`Year: ${film?.Year}`}</p> */}
            {/* <p>{`Runtime: ${film?.runtime}`}</p> */}
            {/* <p>{`Country: ${film?.country}`}</p> */}
            {/* <p>{`Rating: ${film?.rating}`}</p> */}
            {/* <p>{`Actors: ${film?.actors}`}</p> */}
            {/* <p>{`Director: ${film?.director}`}</p> */}
            {/* <p>{`Writer: ${film?.writer}`}</p> */}
          </div>
          <p className={classes.copy}>{film?.plot}</p>
        </div>
      </div>
    </section>
  )
};
