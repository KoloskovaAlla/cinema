import classes from './FilmInfo.module.scss';

export const FilmInfo = ({ selectedMovie }) => {
  return (
       <section className={classes.section}>
      <div className={classes.wrapper}>
        <div className={classes.body}>
         
          <h1 className={classes.title}>
            {selectedMovie?.title}
          </h1>
     
          <p className={classes.copy}>{selectedMovie?.overview}</p>

          <div className={classes.infoBlock}>
            <p>{`Популярность: ${selectedMovie?.popularity}`}</p>      
            <p>{`Дата выхода: ${selectedMovie?.release_date}`}</p>
          </div>
        </div>

        <div className={classes.image}>
        <img 
          src={`https://image.tmdb.org/t/p/w200/${selectedMovie?.poster_path}`} 
          alt={selectedMovie?.title} 
        />
        </div>
      </div>
    </section>
  )
};