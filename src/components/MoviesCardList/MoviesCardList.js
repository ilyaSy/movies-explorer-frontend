import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesURL } from '../../utils/constants';
import './MoviesCardList.css';

export default function MoviesCardList ({ movies, updateMoviesList }) {
  const moviesCountStart = 12;
  const moviesCountMore = 3;

  const [moviesShown, setMoviesShown] = useState([]);
  const [moviesCount, setMoviesCount] = useState(moviesCountStart);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setMoviesShown(movies.filter((m, i) => i < moviesCountStart));
  }, [movies, setMoviesShown]);

  const handleShowMore = () => {
    setMoviesCount(moviesCount + moviesCountMore);
    setMoviesShown(movies.filter((m, i) => i < moviesCount));
  }

  return (
    movies.length ? (
      <>
        <section className='movies-list'>
          {
            moviesShown.map((movie) => (
              <MoviesCard 
                key={movie.id}
                movie={movie}
                updateMoviesList={updateMoviesList}
              />
            ))
            
          }
        </section>
        {
          pathname === moviesURL && moviesCount < movies.length && (
            <button className='movies-list__button' onClick={handleShowMore}>Ещё</button>
          )
        }
      </>
    ) : (
      <p className='movies-list_nodata-text'>Ничего не найдено</p>
    )
  );
}