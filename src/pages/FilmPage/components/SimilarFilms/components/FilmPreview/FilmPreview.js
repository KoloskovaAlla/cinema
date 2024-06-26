import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFilm } from 'hooks';
import classes from './FilmPreview.module.scss';
import { useEffect } from 'react';

export const FilmPreview = ({ key, movie }) => {
  const dispatch = useDispatch();
  const { film, setFilm } = useFilm();
  const { id } = film;
  const handlePreviewClick = () => {
    dispatch(setFilm(movie));
    // console.log(movie.title);
  };


  return (
    <Link to={`/${movie.id}`} onClick={handlePreviewClick}>
      <div key={movie.id} className="movie">
        <div className={classes.image}>
          <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
        </div>
        <h2>{movie.title}</h2>
      </div>
    </Link>
  );
};