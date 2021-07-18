import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies } from '../../utils/testData';
import './SavedMovies.css';

export default function Movies () {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  );
}