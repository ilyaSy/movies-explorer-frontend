import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

export default function Movies({movies, loadMovies, userMovies, loadUserMovies, onMovieAction}) {
  const [search, setSearch] = useState();
  const [shortFilm, setShortFilm] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isErrData, setIsErrData] = useState(false);

  useEffect(() => {
    if (!userMovies) loadUserMovies(setIsErrData, setIsLoading);
  }, []);

  const handleSearch = (searchValue, shortFilmValue) => {    
    setSearch(searchValue);
    setShortFilm(shortFilmValue);

    if (!movies || !movies.length) loadMovies(setIsErrData, setIsLoading);
  };

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSearch}
        onCheckboxClick={setShortFilm}
        isMoviesLoaded={!!movies && !!movies.length}
      />
      {!isLoading && !isErrData && (
        <MoviesCardList
          movies={
            !movies ? [] : 
              movies
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
