import { useState, useEffect } from 'react';
import { Slider } from './components';

export const Films = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'bc8eebf42f936c16863715b5622480d4';
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU`);
        const data = await response.json();
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <h1>Лучшие фильмы</h1>
      <Slider movies={movies} />
    </>
  )
};