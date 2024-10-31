import classes from './FilmPreview.module.scss';
import { Link } from 'react-router-dom';


export const FilmPreview = ({ movie }) => {
  const { imdbID, Title, Poster } = movie;

  // Это в секции похожих фильмов
  return (
    <Link to={`/${imdbID}`}>
      <div key={movie.id} className="movie">
        <div className={classes.image}>
          <img src={Poster} alt={Title} />
        </div>
        <h2>{Title}</h2>
      </div>
    </Link>
  );
};
