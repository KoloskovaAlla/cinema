import { useEffect } from 'react';
import classes from './FilmPreview.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useFilm } from 'hooks';

export const FilmPreview = ({ movie }) => {
  const { id, title } = movie;

  const { film } = useFilm();

  return (
    <Link to={`/${id}`}>
      <div key={movie.id} className="movie">
        <div className={classes.image}>
          {/* <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} /> */}
          <img src={`https://image.tmdb.org/t/p/w200/${movie.Poster}`} alt={movie.title} />

        </div>
        {/* <h2>{movie.title}</h2> */}
        <h2>{movie.Title}</h2>
      </div>
    </Link>
  );
};