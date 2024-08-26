import classes from './SimilarFilms.module.scss';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useFilm } from 'shared/hooks';
import { FilmPreview } from './components';
import { LeftArrowIcon, RightArrowIcon } from './assets';

export const SimilarFilms = ({ similarMovies }) => {
  const navigationPrevSimilarRef = useRef(null);
  const navigationNextSimilarRef = useRef(null);

  const { film } = useFilm();
 
  if (!film) return;

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
