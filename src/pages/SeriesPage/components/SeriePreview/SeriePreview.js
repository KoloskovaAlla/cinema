import classes from './SeriePreview.module.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const SeriePreview = ({ serie }) => {
    const { imdbID, Title, Poster } = serie;

    useEffect(() => {
        console.log(serie);
    }, [serie]);

    const handleMouseEnter = () => {   
        // setIsHovered(true);
        // imageRef.current.style.scale = '1.2';
        // imageRef.current.style.transitionProperty = 'all';
        // imageRef.current.style.transitionDuration = '1s';     
        // console.log('mouse entered')
      };
      
      const handleMouseLeave = () => {
        // setIsHovered(false);
        // imageRef.current.style.scale = '1';
        // imageRef.current.style.transitionProperty = 'all';
        console.log('mouse left')
      };

    return (
        <Link to={`/${imdbID}`}        
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}              
        >
        <div key={imdbID} className={classes.serie}
          // className={isHovered ? classes.hovered : ''}      
        >
          <div className={classes.image}>
            <img 
              src={Poster} 
              alt={Title} 
            //   ref={imageRef}
            />
          </div>
          <h2 className={classes.title}>{Title}</h2>
        </div>
      </Link>
    )
};