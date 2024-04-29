import classes from './Similar.module.scss';
export const SimilarFilms = ({ movies, selectedMovie }) => {
  if (!selectedMovie) return;

  const getMovieGenres = (movie) => {
    return movie.genre_ids.map(genreId => {
      // Здесь вы можете выполнить какую-то логику для преобразования id жанра в сам жанр
      return genreId;
    });
  };

  const findSimilarMovies = (selectedMovie, allMovies) => {
    const selectedMovieGenres = getMovieGenres(selectedMovie);

    return allMovies.filter(movie => {
      if (movie.id === selectedMovie.id) {
        return false; // Исключаем выбранный фильм из списка похожих
      }
      // Проверяем, есть ли хотя бы один общий жанр между выбранным фильмом и текущим фильмом
      const movieGenres = getMovieGenres(movie);
      return selectedMovieGenres.some(genre => movieGenres.includes(genre));
    });
  };

  


const similarMovies = findSimilarMovies(selectedMovie, movies);

return (
  <>
    {/* Код вашей страницы */}
    <h2>Похожие фильмы:</h2>
    <div className={classes.similarMovies}>
      {similarMovies.map(movie => (
        'Превью фильма'
        // <FilmPreview key={movie.id} movie={movie} />
      ))}
    </div>
  </>
);
};
