
import classes from './HomePage.module.scss';
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import { LeftArrowIcon, RightArrowIcon } from './assets';
import { FilmPreview } from './components';

export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // const apiKey = 'bc8eebf42f936c16863715b5622480d4';
        const apiKey = '35b2affc';
        // const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU`);
        // const response = await fetch(`http://www.omdbapi.com/?s=movie&apikey=${apiKey}`);
        const response = await fetch(`https://www.omdbapi.com/?s=movie&apikey=${apiKey}`);
        const data = await response.json();
        console.log(data);
        // console.log(data.Search);
        // setMovies(data.results);
        setMovies(data.Search);

      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    console.log(swiperRef)
    console.log('test')
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
        ref={swiperRef}
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

      </Swiper>
    </div>
  );
};
