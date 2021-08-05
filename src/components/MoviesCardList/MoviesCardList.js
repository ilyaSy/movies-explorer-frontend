import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesURL } from '../../utils/constants';
import useResize from '../../utils/useResize'
import './MoviesCardList.css';

export default function MoviesCardList ({ movies, updateMoviesList }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [moviesShown, setMoviesShown] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;

  const [moviesCountStart, moviesCountMore] = useResize(width);
  const [moviesCount, setMoviesCount] = useState(moviesCountStart);

  // --------------------------------------------------------
  const resetResize = () => setWidth(window.innerWidth);

  let resizeTimer = false;
  const handleResizeTimer = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resetResize, 500);
  }  

  window.addEventListener('resize', handleResizeTimer);
  // --------------------------------------------------------

  useEffect(() => {
    setMoviesShown(movies.filter((m, i) => i < moviesCountStart));
  }, [movies, setMoviesShown]);

  const handleShowMore = () => {
    console.log(moviesCountMore);
    setMoviesShown(movies.filter((m, i) => i < moviesCount + moviesCountMore));
    setMoviesCount(moviesCount + moviesCountMore);    
  }

  return (
    movies.length ? (
      <>
        <section className='movies-list'>
          {
            moviesShown.map((movie) => (
              <MoviesCard 
                key={movie.movieId}
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