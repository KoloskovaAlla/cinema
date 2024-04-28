
import classes from './Films.module.scss';
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import { LeftArrowIcon, RightArrowIcon } from './assets';
import { FilmPreview } from './components';

export const Films = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'bc8eebf42f936c16863715b5622480d4';
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU`);
        const data = await response.json();
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className={classes.wrapper}>
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
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >

        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <FilmPreview movie={movie} />
            {/* <div key={movie.id} className="movie">
              <div className={classes.image}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
              </div>
              <h2>{movie.title}</h2>
            </div> */}
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
