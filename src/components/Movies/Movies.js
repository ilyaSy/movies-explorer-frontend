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
  }, [userMovies, loadUserMovies]);

  const handleSearch = (searchValue, shortFilmValue) => {    
    setSearch(searchValue);
    setShortFilm(shortFilmValue);

    if (!movies || !movies.length) loadMovies(setIsErrData, setIsLoading);
  };

  const filterMovies = (moviesList, searchValue, shortFilmValue) => {
    return !moviesList ? 
      [] : 
      moviesList
        .filter((m) => RegExp(searchValue, 'i').test(m.nameRU) || RegExp(searchValue, 'i').test(m.nameEN))
        .filter((m) => (shortFilmValue ? m.duration <= 40 : true))
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
          isSearchNotClicked={!search && !shortFilm}
          movies={filterMovies(movies, search, shortFilm)}
          updateMoviesList={onMovieAction}
        />
      )}
      {!isLoading && isErrData && (
        <p className='movies__error-text'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      )}
      {isLoading && (<Preloader />)}
    </main>
  );
}
