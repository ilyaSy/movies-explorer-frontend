import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MainApi from '../../utils/MainApi';
import './SavedMovies.css';

export default function SavedMovies () {
  const [movies, setMovies] = useState([]);
  const [moviesShown, setMoviesShown] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNoData, setIsNoData] = useState(false);
  const [isErrData, setIsErrData] = useState(false);

  useEffect(() => {
    MainApi.getMovies()
      .then((res) => {
        setIsLoading(false);
        if (res && Array.isArray(res)) {
          res.length ? setMovies(res) : setIsNoData(true);
          if (res.length) setMoviesShown(res);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsErrData(true);
      });
  }, []);

  const handleSearch = (search, shortFilm) => {
    const filteredMovies = filterMovies(movies, search, shortFilm);

    if (!filteredMovies.length) {
      setIsNoData(true);
      setIsLoading(false);
    } else {
      setMoviesShown(filteredMovies);
      setIsLoading(false);
    }
  };

  const filterMovies = (movies, filterValue, shortFilm) => {
    const regexp = new RegExp(filterValue, 'i');
    return movies
      .filter((m) => regexp.test(m.nameRU) || regexp.test(m.nameEN))
      .filter((m) => (shortFilm ? m.duration <= 40 : true));
  };

  const updateMoviesList = (movie) => {
    setMovies(movies.filter((m) => m.movieId !== movie.movieId));
    setMoviesShown(moviesShown.filter((m) => m.movieId !== movie.movieId));
  }

  return (
    <main className='saved-movies'>
      <SearchForm onSubmit={handleSearch} />
      {!isLoading && !isNoData && !isErrData && (
        <MoviesCardList movies={moviesShown} updateMoviesList={updateMoviesList} />
      )}
      {!isLoading && isNoData && (
        <p className='movies__description-text'>Ничего не найдено</p>
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