import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies } from '../../utils/testData';
import './Movies.css';

export default function Movies () {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  );
}