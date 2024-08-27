import React from 'react';
import { useEffect } from 'react';
import classes from './FilmPreview.module.scss';
import { useFilm } from 'shared/hooks';
import { Link } from 'react-router-dom';

export const FilmPreview = ({ movie }) => {
  const { imdbID, Title, Poster } = movie;

  const state = useFilm();

  return (
    <Link to={`/${imdbID}`}>
      <div key={imdbID} className="movie">
        <div className={classes.image}>
          <img src={Poster} alt={Title} />
        </div>
        <h2>{Title}</h2>
      </div>
    </Link>
  );
};
