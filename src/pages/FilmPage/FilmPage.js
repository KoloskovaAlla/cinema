import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FilmInfo, SimilarFilms } from './components';
import { useFilm, useMovies } from 'hooks';
import classes from './FilmPage.module.scss';
import { useDispatch } from 'react-redux';

export const FilmPage = () => {
  const params = useParams();
  const { id } = params;
  const { film, setFilm } = useFilm();

  const dispatch = useDispatch();

  const moviesState = useMovies();
  const { movies } = moviesState;
 const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (film && movies && movies.length > 0) {
      // Разбиваем жанры текущего фильма на массив
      const currentGenres = film.genre.split(',').map(genre => genre.trim());

      // Фильтруем фильмы, у которых есть совпадающие жанры
      const filteredMovies = movies.filter(movie => {
        const movieGenres = movie.genre.split(',').map(genre => genre.trim());
        // Проверяем есть ли пересечения жанров
        return movie !== film && movieGenres.some(genre => currentGenres.includes(genre));
      });      
     
      setSimilarMovies(filteredMovies);
    }
  }, [film, movies]);



  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const apiKey = '35b2affc';
  //       const response = await fetch(`https://www.omdbapi.com/?s=movie&apikey=${apiKey}`);
  //       const data = await response.json();
  //       setMovies(data.Search);
  //     } catch (error) {
  //       console.error('Error fetching movies:', error);
  //     }
  //   };
  //   fetchMovies();
  // }, []);
  
  useEffect(() => {
    if (!movies) return;   
    const film = movies?.find(movie => movie.imdbID === id);       
    dispatch(setFilm(film));
  }, [film, movies]);

  if (!movies) return;
  return (
    <div className={classes.filmPage}>
      <FilmInfo film={film} />
      {similarMovies && <SimilarFilms similarMovies={similarMovies} />}  
    </div>
  )
};
