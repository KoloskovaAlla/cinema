import classes from './HomePage.module.scss';
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { LeftArrowIcon, RightArrowIcon } from './assets';
import { FilmPreview } from './components';
import { classNames } from 'utils/helpers';
import { useMovies } from 'hooks';
import { useDispatch } from 'react-redux';

export const HomePage = () => {
  const dispatch = useDispatch();
  // const [movies, setMovies] = useState([]);
  const moviesState = useMovies();
  const { movies } = moviesState;
   const swiperRef = useRef(null);

     useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;
      swiper.params.pagination.el = paginationRef.current;

      swiper.navigation.init();
      swiper.navigation.update();
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();
    }
  }, [movies]); // Ensure this effect runs after movies are fetched

  useEffect(() => {
    dispatch(moviesState.getMovies());
  }, [dispatch]); 
  
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);
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

  if (!movies) return;

  return (
    <div className={classes.homePage}>
      <h1 className={classes.title}>Лучшие фильмы</h1>
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
          nextEl: navigationNextRef.current,
          prevEl: navigationPrevRef.current,
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
          type: 'bullets',
          bulletClass: classes.bullet,
          bulletActiveClass: classes.bullet_active,
        }}
        onSlideChange={onSlideChange}
        ref={swiperRef}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <FilmPreview movie={movie} />
          </SwiperSlide>
        ))}
        <button className={buttonPrevClassNames} ref={navigationPrevRef}>
          <LeftArrowIcon />
        </button>
        <div className={classes.swiper_pagination_custom} ref={paginationRef}>
        </div>
        <button className={buttonNextClassNames} ref={navigationNextRef}>
          <RightArrowIcon />
        </button>
      </Swiper>
    </div>
  );
};
