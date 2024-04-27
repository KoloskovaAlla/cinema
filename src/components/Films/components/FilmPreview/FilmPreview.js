import classes from './FilmPreview.module.scss';

export const FilmPreview = ({ movie }) => {
  return (
    <div key={movie.id} className="movie">
      <div className={classes.image}>
        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
      </div>
      <h2>{movie.title}</h2>
    </div>
  );
};