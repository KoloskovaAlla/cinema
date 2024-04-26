
import classes from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';

export const Slider = ({ movies }) => {
  return (
    <div className={classes.wrapper}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          770: {
            slidesPerView: 3
          },
          1150: {
            slidesPerView: 4
          },
          1440: {
            slidesPerView: 4
          }
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >

        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div key={movie.id} className="movie">
              <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          </SwiperSlide>
        ))}


      </Swiper>
    </div>
  );
};
