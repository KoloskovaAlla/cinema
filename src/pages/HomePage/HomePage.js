import classes from './HomePage.module.scss';
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { LeftArrowIcon, RightArrowIcon } from './assets';
import { FilmPreview } from './components';
import { classNames } from 'utils/helpers';

export const HomePage = () => {
  const [movies, setMovies] = useState([]);

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

  useEffect(() => {
    console.log(movies);
  }, [movies]);

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
