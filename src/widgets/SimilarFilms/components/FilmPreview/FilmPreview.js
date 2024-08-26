import classes from './FilmPreview.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFilm } from 'shared/hooks';

export const FilmPreview = ({ movie }) => {
  const dispatch = useDispatch();
  const { setFilm } = useFilm();

  const handlePreviewClick = () => {
    dispatch(setFilm(movie)); 
  };

  return (
    <Link to={`/${movie.id}`} onClick={handlePreviewClick}>
      <div key={movie.id} className="movie">
        <div className={classes.image}>
          <img src={movie.Poster} alt={movie.title} />
        </div>
        <h2>{movie.title}</h2>
      </div>
    </Link>
  );
};
