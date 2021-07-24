import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies } from '../../utils/testData';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

export default function SavedMovies () {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false);
    }, 1000);
  }, []);

  return (
    <main className='saved-movies'>
      <SearchForm />
      {
        isLoaded ? (
          <MoviesCardList movies={movies} />
        ) : (
          <Preloader />
        )
      }
    </main>
  );
}