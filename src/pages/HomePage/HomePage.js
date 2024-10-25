import classes from './HomePage.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useMovies, useDocumentTitle } from 'shared/hooks';
import { LeftArrowIcon, RightArrowIcon } from './assets';
import { FilmPreview } from './components';
import { Preloader } from 'widgets';

export const HomePage = () => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);

  const moviesState = useMovies();
  const { movies } = moviesState;

  const title = 'Film Finder'

  useDocumentTitle(title);

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
  }, [movies]);

  useEffect(() => {
    dispatch(moviesState.getMovies());
  }, [dispatch]);

  useEffect(() => {
    const prevButton = navigationPrevRef.current;
    const nextButton = navigationNextRef.current;

    if (prevButton && nextButton) {
      const handlePrevTouchStart = () => {
        console.log('Prev button clicked');
        console.log(prevButton);

        // Изменяем масштаб кнопки
        prevButton.style.transform = 'scale(1.5)'; // Увеличиваем размер кнопки

        // Возвращаем размер к нормальному через 300 мс
        // setTimeout(() => {
        //   prevButton.style.transform = 'scale(1)'; // Возвращаем к нормальному размеру
        // }, 300);
      };

      const handlePrevTouchEnd = () => {
        console.log('Prev button clicked');
        console.log(prevButton);

        // Изменяем масштаб кнопки
        prevButton.style.transform = 'scale(1.0)'; // Увеличиваем размер кнопки

        // Возвращаем размер к нормальному через 300 мс
        // setTimeout(() => {
        //   prevButton.style.transform = 'scale(1)'; // Возвращаем к нормальному размеру
        // }, 300);
      };

      const handleNextTouchStart = () => {
        console.log('Next button clicked');
        console.log(nextButton);

        // Изменяем масштаб кнопки
        nextButton.style.transform = 'scale(1.5)'; // Увеличиваем размер кнопки

        // Возвращаем размер к нормальному через 300 мс
        // setTimeout(() => {
        //   nextButton.style.transform = 'scale(1)'; // Возвращаем к нормальному размеру
        // }, 300);
      };

      const handleNextTouchEnd = () => {
        console.log('Next button clicked');
        console.log(nextButton);

        // Изменяем масштаб кнопки
        nextButton.style.transform = 'scale(1.0)'; // Увеличиваем размер кнопки

        // Возвращаем размер к нормальному через 300 мс
        // setTimeout(() => {
        //   nextButton.style.transform = 'scale(1)'; // Возвращаем к нормальному размеру
        // }, 300);
      };


      // Добавляем обработчики
      prevButton.addEventListener('touchstart', handlePrevTouchStart);
      prevButton.addEventListener('touchend', handlePrevTouchEnd);

      nextButton.addEventListener('touchstart', handleNextTouchStart);
      nextButton.addEventListener('touchend', handleNextTouchEnd);
      // Убираем обработчики при размонтировании
      // return () => {
      //   prevButton.removeEventListener('click', handlePrevClick);
      //   nextButton.removeEventListener('click', handleNextClick);
      // };
    } else {
      console.log("Buttons not ready yet");
    }
  }, [navigationPrevRef, navigationNextRef, movies]);

  if (!movies) return (Preloader);

  return (
    <div className={classes.homePage}>
      <div className={classes.mySwiper}>
        <h1 className={classes.title}>The Best Films</h1>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            770: {
              slidesPerView: 2
            },
            1150: {
              slidesPerView: 5
            },
            1440: {
              slidesPerView: 5
            }
          }}
          loop={true}
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
          ref={swiperRef}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <FilmPreview movie={movie} />
            </SwiperSlide>
          ))}
          <button
            className={classes.swiper_button_prev_custom}
            ref={navigationPrevRef}
          >
            <LeftArrowIcon />
          </button>
          <div className={classes.swiper_pagination_custom} ref={paginationRef}>
          </div>
          <button
            className={classes.swiper_button_next_custom}
            ref={navigationNextRef}
          >
            <RightArrowIcon />
          </button>
        </Swiper>
      </div>
    </div>
  );
};
