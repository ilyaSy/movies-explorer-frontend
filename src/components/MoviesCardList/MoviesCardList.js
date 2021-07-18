import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList ({movies}) {
  return (
    <>
      <section className='movies-list'>
        {
          movies.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))
        }
      </section>
      <button className='movies-list__button'>Ещё</button>
    </>
  );
}