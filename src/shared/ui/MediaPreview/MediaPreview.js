import { useState } from 'react';
import classes from './FilmPreview.module.scss';
import { Link } from 'react-router-dom';
import {useEffect, useRef } from 'react';
import { classNames } from 'shared/utils/helpers';

export const MediaPreview = ({ item }) => {
  const { imdbID, Title, Poster } = movie;
  const imageRef = useRef(null);
   
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    imageRef.current.style.scale = '1.2';
    imageRef.current.style.transitionProperty = 'all';
    imageRef.current.style.transitionDuration = '1s';
    console.log('mouse entered')
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    imageRef.current.style.scale = '1';
    imageRef.current.style.transitionProperty = 'all';
  };

  const filmPreviewClassNames = classNames(classes.movie, {
    [classes.hovered]: isHovered,
  });

  // Это на домашней (главной) странице
  return (
    <Link to={`/${imdbID}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}              
      >
      <div key={imdbID} className={classes.movie}
        // className={isHovered ? classes.hovered : ''}      
      >
        <div className={classes.image}>
          <img 
            src={Poster} 
            alt={Title} 
            ref={imageRef}
          />
        </div>
        <h2 className={classes.title}>{Title}</h2>
      </div>
    </Link>
  );
};
