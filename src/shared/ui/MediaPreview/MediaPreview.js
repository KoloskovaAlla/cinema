import {useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/utils/helpers';
import { IconEmptyBookmark, IconFillBookmark } from 'shared/icons';
import classes from './MediaPreview.module.scss';

export const MediaPreview = ({ item }) => {    
  const { imdbID, Title, Poster } = item;  

  const imageRef = useRef(null);
  const bookmarkButtonRef = useRef(null);

  const [isMediaPreviewHovered, setIsMediaPreviewHovered] = useState(false);  

  //

  // const handleLikeClick = () => {
  //   if (favoriteFilms.includes(film)) {
  //     dispatch(setIsFavorite(false));
  //     removeFromFavoriteFilms(film);
  //   }
  //   else {
  //     addToFavoriteFilms(film);
  //     dispatch(setIsFavorite(true));
  //   }
  // };
  
  const handleMouseEnter = () => {
    setIsMediaPreviewHovered(true);
    // imageRef.current.style.scale = '1.2';
    // imageRef.current.style.transitionProperty = 'all';
    // imageRef.current.style.transitionDuration = '1s';   
  };
  
  const handleMouseLeave = () => {
    setIsMediaPreviewHovered(false);
    // imageRef.current.style.scale = '1';
    // imageRef.current.style.transitionProperty = 'all';
  };

  const filmPreviewClassNames = classNames(classes.movie, {
    [classes.hovered]: isMediaPreviewHovered,
  });
  const linkClassNames = classNames(classes.link, {
    [classes.hovered]: isMediaPreviewHovered,
  });

   // Это на домашней (главной) странице
  return (
    <Link to={`/${imdbID}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={linkClassNames}              
    >
      <div key={imdbID} className={filmPreviewClassNames}        
      >
        <div className={classes.image}>
          <img 
            src={Poster} 
            alt={Title} 
            ref={imageRef}
          />
        </div>
        {/* {isFilmHover && isLikeVisible && !isFavorite && ( */}
        {/* {isFilmHover && isLikeVisible && !isFavorite && ( */}
        {isMediaPreviewHovered && (
          <div className={classes.footer}>
            <h2 className={classes.title}>{Title}</h2>
            <IconEmptyBookmark
            // <IconFillBookmark
              className={classes.bookmark}
              ref={bookmarkButtonRef}
              // onClick={handleLikeClick}
              // onMouseEnter={handleLikeMouseEnter}
              // onMouseLeave={handleLikeMouseLeave}
            />
     
          </div>)
        }
      </div>
    </Link>
  );
};
