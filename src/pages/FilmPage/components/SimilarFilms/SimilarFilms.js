import classes from './SimilarFilms.module.scss';
import { FilmPreview } from './components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { LeftArrowIcon, RightArrowIcon } from './assets';
import { useRef, useState, useEffect } from 'react';

export const SimilarFilms = ({ movies, selectedMovie }) => {
  const navigationPrevSimilarRef = useRef(null);
  const navigationNextSimilarRef = useRef(null);
  if (!selectedMovie) return;

  const getMovieGenres = (movie) => {
    return movie.genre_ids.map(genreId => {
      // Здесь вы можете выполнить какую-то логику для преобразования id жанра в сам жанр
      return genreId;
    });
  };

const findSimilarMovies = (selectedMovie, allMovies) => {
  const selectedMovieGenres = new Set(selectedMovie.genre_ids);

  return allMovies.filter(movie => {
    if (movie.id === selectedMovie.id) {
      return false; // Исключаем выбранный фильм из списка похожих
    }
    // Проверяем, сколько общих жанров между выбранным фильмом и текущим фильмом
    const commonGenres = movie.genre_ids.filter(genreId => selectedMovieGenres.has(genreId));
    return commonGenres.length >= 2; // Проверяем, совпадает ли более 1 идентификатора жанра
  });
}; 


const similarMovies = findSimilarMovies(selectedMovie, movies);

console.log(similarMovies);

return (
  <>
    {/* Код вашей страницы */}
    <h2>Похожие фильмы:</h2>
    <div className={classes.similarMovies}>
      <Swiper
        className={classes.mySwiper}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          770: {
            slidesPerView: 2
          },
          1150: {
            slidesPerView: 3
          },
          1440: {
            slidesPerView: 4
          }
        }}
        navigation={{
          nextEl: navigationNextSimilarRef.current,
          prevEl: navigationPrevSimilarRef.current,
        }}
      >

        {similarMovies.map((movie, index) => (
          <SwiperSlide key={index}>
            <FilmPreview movie={movie} />
          </SwiperSlide>
        ))}
        <button className={classes.swiper_button_prev_custom} ref={navigationPrevSimilarRef}>
          <LeftArrowIcon />
        </button>
        <button className={classes.swiper_button_next_custom} ref={navigationNextSimilarRef}>
          <RightArrowIcon />
        </button>

      </Swiper>
    </div>
  </>
);
};
