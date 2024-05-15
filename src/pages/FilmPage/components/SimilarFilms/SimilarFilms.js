import classes from './SimilarFilms.module.scss';
import { FilmPreview } from './components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useFilm } from 'hooks';
import { LeftArrowIcon, RightArrowIcon } from './assets';
import { useRef } from 'react';

export const SimilarFilms = ({ movies }) => {
  const { film } = useFilm();
  const navigationPrevSimilarRef = useRef(null);
  const navigationNextSimilarRef = useRef(null);
  if (!film) return;

  const findSimilarMovies = (film, allMovies) => {
    const selectedMovieGenres = new Set(film.genre_ids);

    return allMovies.filter(movie => {
      if (movie.id === film.id) {
        return false;
      }
      const commonGenres = movie.genre_ids.filter(genreId => selectedMovieGenres.has(genreId));
      return commonGenres.length >= 2;
    });
  };

  const similarMovies = findSimilarMovies(film, movies);

  return (
    <>
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
