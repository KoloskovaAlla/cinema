import classes from './FilmPage.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFilm, useMovies } from 'shared/hooks';
import { FilmInfo } from './components';
import { SimilarFilms } from 'widgets';

export const FilmPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const { film, setFilm } = useFilm();

  const moviesState = useMovies();
  const { movies } = moviesState;
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (film && movies && movies.length > 0) {
      const currentGenres = film.genre.split(',').map(genre => genre.trim());

      const filteredMovies = movies.filter(movie => {
        const movieGenres = movie.genre.split(',').map(genre => genre.trim());
        return movie !== film && movieGenres.some(genre => currentGenres.includes(genre));
      });

      setSimilarMovies(filteredMovies);
    }
  }, [film, movies, id]);

  useEffect(() => {
    if (!movies) return;
    const film = movies?.find(movie => movie.imdbID === id);
    localStorage.setItem('film', JSON.stringify(film));
    dispatch(setFilm(film));
  }, [film, movies, id]);

  return (
    <div className={classes.filmPage}>
      <FilmInfo film={film} />
      {similarMovies && <SimilarFilms similarMovies={similarMovies} />}
    </div>
  )
};
