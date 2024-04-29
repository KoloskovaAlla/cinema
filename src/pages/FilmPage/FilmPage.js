import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './FilmPage.module.scss';           

export const FilmPage = () => {
  const params = useParams();
  const { id } = params;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'bc8eebf42f936c16863715b5622480d4';
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU`);
        const data = await response.json();
        console.log(data);
        setMovies(data.results);
        // console.log(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    if(!movies) return;
    const selectedMovie = movies?.find(movie => movie.id === parseInt(id));
    setSelectedMovie(selectedMovie);
  }, [selectedMovie, movies]);

  if (!movies) return;
  return (
    <>   
      {/* <div>{`Страница с id ${id}`}</div>
      <div>{`Для фильма ${selectedMovie?.title}`}</div> */}
          <section className={classes.section}>
      <div className={classes.wrapper}>
        <div className={classes.body}>
         
          <h1 className={classes.title}>
            {selectedMovie?.title}
          </h1>
     
          <p className={classes.copy}>{selectedMovie?.overview}</p>

          <div className={classes.infoBlock}>
            <p>{`Популярность: ${selectedMovie?.popularity}`}</p>      
            <p>{`Дата выхода: ${selectedMovie?.release_date}`}</p>
          </div>
        </div>

        <div className={classes.image}>
        <img 
          src={`https://image.tmdb.org/t/p/w200/${selectedMovie?.poster_path}`} 
          alt={selectedMovie?.title} 
        />
        </div>
      </div>
    </section>
    </>
  )
};