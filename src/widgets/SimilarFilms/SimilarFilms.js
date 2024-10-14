import classes from './SimilarFilms.module.scss';
import { useRef, useState, useEffect } from 'react';
import { classNames } from 'utils/helpers'; // надо перенести в соответствии с FSD
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useFilm, useMovies } from 'shared/hooks';
import { FilmPreview } from './components';
import { LeftArrowIcon, RightArrowIcon } from './assets';

export const SimilarFilms = ({ similarFilms }) => {
  const navigationPrevSimilarRef = useRef(null);
  const navigationNextSimilarRef = useRef(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const onSlideChange = (swiper) => {
    setIsPrevDisabled(swiper.isBeginning);
    setIsNextDisabled(swiper.isEnd);
  };

  const buttonPrevClassNames = classNames(classes.swiper_button_prev_custom, {
    [classes.disablePrev]: isPrevDisabled,
  });

  const buttonNextClassNames = classNames(classes.swiper_button_next_custom, {
    [classes.disableNext]: isNextDisabled,
  });


  const { film } = useFilm();

  const moviesState = useMovies();
  const { movies } = moviesState;


  if (!film) return;
  return (

    <section className={classes.similarFilms}>
      <h2 className={classes.title}>Similar Films:</h2>
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
        onSlideChange={onSlideChange}
      >

        {similarFilms.map((movie, index) => (
          <SwiperSlide key={index}>
            <FilmPreview movie={movie} />
          </SwiperSlide>
        ))}
        <button className={buttonPrevClassNames} ref={navigationPrevSimilarRef}>
          <LeftArrowIcon />
        </button>
        <button className={buttonNextClassNames} ref={navigationNextSimilarRef}>
          <RightArrowIcon />
        </button>

      </Swiper>
    </section>

  );
};
