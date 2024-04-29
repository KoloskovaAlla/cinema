import classes from './FilmPreview.module.scss';
import { Link } from 'react-router-dom';

export const FilmPreview = ({ key, movie }) => {
  const { id } = movie;

  return (
    <Link to={`/${id}`}>
      <div key={movie.id} className="movie">
        <div className={classes.image}>
          <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
        </div>
        <h2>{movie.title}</h2>
      </div>
    </Link>
  );
};