import classes from './SeriesPage.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSeries } from 'shared/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { SeriePreview } from './components';
import { MediaPreview } from 'shared/ui';
import { LeftArrowIcon, RightArrowIcon } from 'shared/icons';
import { classNames } from 'shared/utils/helpers';

export const SeriesPage = () => {
    const dispatch = useDispatch();
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);
    const paginationRef = useRef(null);
    const swiperRef = useRef(null);

    const seriesState = useSeries();
    const { series } = seriesState;

    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    
    const buttonNextClassNames = classNames(classes.swiper_button_next_custom, {
        [classes.disableNext]: isNextDisabled,
    });

    const buttonPrevClassNames = classNames(classes.swiper_button_prev_custom, {
        [classes.disablePrev]: isPrevDisabled,
    });

    const onSlideChange = (swiper) => {
        console.log('change');
        setIsPrevDisabled(swiper.isBeginning);
        setIsNextDisabled(swiper.isEnd);
    };

    useEffect(() => {
        dispatch(seriesState.getSeries());
    }, [dispatch]);  
    
    if (!series) return;

    return (
        <div>Seriespage
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
            {series.map((serie, index) => (
                <SwiperSlide key={index}>                  
                    <MediaPreview item={serie} />
                </SwiperSlide>
            ))}
            <button
                className={buttonPrevClassNames}
                ref={navigationPrevRef}
            >
                <LeftArrowIcon />
            </button>
            <div 
                className={classes.swiper_pagination_custom} 
                ref={paginationRef}>
            </div> 
            <button
                className={buttonNextClassNames}
                ref={navigationNextRef}
            >
                <RightArrowIcon />
            </button>
        </Swiper>
        </div>
    )
}