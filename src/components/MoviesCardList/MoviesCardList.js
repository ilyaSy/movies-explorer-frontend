import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesURL, savedMoviesURL } from '../../utils/constants';
import './MoviesCardList.css';

export default function MoviesCardList ({movies}) {
  const location = useLocation();
  const pathname = location.pathname;

  const moviesShown = pathname === savedMoviesURL ?
    [...movies.filter((m) => m.saved)] : [...movies]

  return (
    <>
      <section className='movies-list'>
        {
          moviesShown.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))
        }
      </section>
      {
        pathname === moviesURL && (
          <button className='movies-list__button'>Ещё</button>
        )
      }
    </>
  );
}