import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const FilmPage = () => {
  const params = useParams();
  const { id } = params;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'bc8eebf42f936c16863715b5622480d4';
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU`);
        const data = await response.json();
        setMovies(data.results);
        // console.log(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    if(!movies) return;
    const selectedMovie = movies?.find(movie => movie.id === parseInt(id));
    console.log(selectedMovie);
    setSelectedMovie(selectedMovie);
  }, [selectedMovie, movies]);

  useEffect(() => {
    // console.log(selectedMovie);
  }, [selectedMovie]);

  if (!movies) return;
  return (
    <>
      Страница фильма
      <div>{`Страница с id ${id}`}</div>
      <div>{`Для фильма ${selectedMovie?.title}`}</div>
    </>
  )
};