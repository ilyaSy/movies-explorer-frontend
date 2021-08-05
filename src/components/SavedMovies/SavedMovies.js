import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

export default function SavedMovies ({userMovies, onMovieAction, loadUserMovies}) {
  const [search, setSearch] = useState();
  const [shortFilm, setShortFilm] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isErrData, setIsErrData] = useState(false);

  useEffect(() => {
    if (!userMovies || !userMovies.length) loadUserMovies(setIsErrData, setIsLoading);
  }, []);

  const handleSearch = (searchValue, shortFilmValue) => {
    setSearch(searchValue);
    setShortFilm(shortFilmValue);
  };

  return (
    <main className='saved-movies'>
      <SearchForm
        onSubmit={handleSearch}
        onCheckboxClick={setShortFilm}
        isMoviesLoaded={!!userMovies && !!userMovies.length}
      />

      {!isLoading && !isErrData && (
        <MoviesCardList 
          movies={
            !userMovies ? [] : 
              userMovies
                .filter((m) => RegExp(search, 'i').test(m.nameRU) || RegExp(search, 'i').test(m.nameEN))
                .filter((m) => (shortFilm ? m.duration <= 40 : true))
          }
          updateMoviesList={onMovieAction}          
        />
      )}
      {!isLoading && isErrData && (
        <p className='movie__description-text'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      )}
      {isLoading && (<Preloader />)}
    </main>
  );
}