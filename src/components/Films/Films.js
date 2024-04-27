
import classes from './Films.module.scss';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import { LeftArrowIcon, RightArrowIcon } from './assets';

export const Films = ({ movies }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className={classes.wrapper}>
      <h1>Лучшие фильмы</h1>
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
            <div key={movie.id} className="movie">
              <div className={classes.image}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
              </div>
              <h2>{movie.title}</h2>
            </div>
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
