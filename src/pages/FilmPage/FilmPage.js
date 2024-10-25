import classes from './FilmPage.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { useFilm, useMovies, useSimilarFilms, useDocumentTitle } from 'shared/hooks';
import { FilmInfo, SimilarFilms } from 'widgets';
import { Preloader } from 'widgets';

export const FilmPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const location = useLocation();

  const { film, setFilm } = useFilm();

  const { similarFilms, setSimilarFilms } = useSimilarFilms();

  const [title, setTitle] = useState('');

  useDocumentTitle(title);

  useEffect(() => {
    setTitle(film.Title);
  }, [film]);

  const moviesState = useMovies();
  const { movies } = moviesState;
  // const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (film && movies && movies.length > 0) {
      const currentGenres = film.genre.split(',').map(genre => genre.trim());

      const filteredMovies = movies.filter(movie => {
        const movieGenres = movie.genre.split(',').map(genre => genre.trim());
        return movie !== film && movieGenres.some(genre => currentGenres.includes(genre));
      });

      dispatch(setSimilarFilms(filteredMovies));
    }
  }, [film, movies, id]);

  useEffect(() => {
    if (!movies) return;
    const film = movies?.find(movie => movie.imdbID === id);
    localStorage.setItem('film', JSON.stringify(film));
    dispatch(setFilm(film));
  }, [film, movies, id]);

  if (!film) return (Preloader);

  return (
    <div className={classes.filmPage}>
      <FilmInfo film={film} />
      {similarFilms && <SimilarFilms similarFilms={similarFilms} />}
    </div>
  )
};
