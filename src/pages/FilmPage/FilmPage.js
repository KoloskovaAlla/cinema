import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FilmInfo, SimilarFilms } from './components';
import { useFilm } from 'hooks';
import classes from './FilmPage.module.scss';
import { useDispatch } from 'react-redux';

export const FilmPage = () => {
  const params = useParams();
  const { id } = params;
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'bc8eebf42f936c16863715b5622480d4';
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);
  const { film, setFilm } = useFilm();

  useEffect(() => {
    if (!movies) return;
    const film = movies?.find(movie => movie.id === parseInt(id));
    dispatch(setFilm(film));
  }, [film, movies]);

  useEffect(() => {
    if (film) console.log(film.title);
    // console.log(id);
  }, [film]);

  if (!movies) return;
  return (
    <div className={classes.filmPage}>
      <FilmInfo film={film} />
      <SimilarFilms movies={movies} film={film} />
    </div>
  )
};