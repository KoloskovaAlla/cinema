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
        const apiKey = '35b2affc';
        const response = await fetch(`https://www.omdbapi.com/?s=movie&apikey=${apiKey}`);
        const data = await response.json();
        setMovies(data.Search);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);
  const { film, setFilm } = useFilm();
  
  useEffect(() => {
    if (!movies) return;   
    const film = movies?.find(movie => movie.imdbID === id);       
    dispatch(setFilm(film));
  }, [film, movies]);

  if (!movies) return;
  return (
    <div className={classes.filmPage}>
      <FilmInfo film={film} />
      <SimilarFilms movies={movies} film={film} />  
    </div>
  )
};
