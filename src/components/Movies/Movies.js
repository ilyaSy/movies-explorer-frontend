import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies as testMovies } from '../../utils/testData';
import Preloader from '../Preloader/Preloader';
import MoviesApi from '../../utils/MoviesApi';
import './Movies.css';

export default function Movies() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    MoviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
        setIsLoaded(true);
        console.log(movies);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className='movies'>
      <SearchForm />
      {isLoaded ? <MoviesCardList movies={testMovies} /> : <Preloader />}
    </main>
  );
}
