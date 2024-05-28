import classes from './HomePage.module.scss';
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { LeftArrowIcon, RightArrowIcon } from './assets';
import { FilmPreview } from './components';

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

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <div className={classes.homePage}>
      <h1 className={classes.title}>Лучшие фильмы</h1>
      <Swiper
        className={classes.mySwiper}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={1} // Одновременно отображается один слайд
        breakpoints={{
          770: {
            slidesPerView: 2 // Одновременно отображается два слайда
          },
          1150: {
            slidesPerView: 3 // Одновременно отображается три слайда
          },
          1440: {
            slidesPerView: 4 // Одновременно отображается четыре слайда
          }
        }}
        navigation={{
          nextEl: navigationNextRef.current,
          prevEl: navigationPrevRef.current,
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
          type: 'bullets', // Используем точечную пагинацию
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <FilmPreview movie={movie} />
          </SwiperSlide>
        ))}
        <button className={classes.swiper_button_prev_custom} ref={navigationPrevRef}>
          <LeftArrowIcon />
        </button>
        <button className={classes.swiper_button_next_custom} ref={navigationNextRef}>
          <RightArrowIcon />
        </button>
        {/* Элемент для кастомной пагинации */}
        <div className={classes.swiper_pagination_custom} ref={paginationRef}>
        </div>
      </Swiper>
    </div>
  );
};
