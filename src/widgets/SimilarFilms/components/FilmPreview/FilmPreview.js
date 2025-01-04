import classes from './FilmPreview.module.scss';
import { Link } from 'react-router-dom';

export const FilmPreview = ({ movie }) => {
  const { imdbID, Title, Poster } = movie;

  // Это в секции похожих фильмов
  return (  
     <Link to={`/${imdbID}`}>
    {/* <Link to={`/${movie.id}`} onClick={handlePreviewClick}> */}
      <div key={movie.id} className="movie">
        <div className={classes.image}>
          <img src={movie.Poster} alt={movie.title} />
        </div>
        <h2>{movie.title}</h2>
      </div>
    </Link>
  );
};
