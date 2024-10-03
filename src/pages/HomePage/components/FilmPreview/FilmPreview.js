import React from 'react';
import classes from './FilmPreview.module.scss';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';

export const FilmPreview = ({ movie }) => {
  const { imdbID, Title, Poster } = movie;

  // Это на домашней (главной) странице
  return (
    <Link to={`/${imdbID}`}>
      <div key={imdbID} className="movie">
        <div className={classes.image}>
          <img src={Poster} alt={Title} />
        </div>
        <h2 className={classes.title}>{Title}</h2>
      </div>
    </Link>
  );
};
