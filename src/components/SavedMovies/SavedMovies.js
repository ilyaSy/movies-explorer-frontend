import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
// import MainApi from '../../utils/MainApi';
import './SavedMovies.css';

export default function SavedMovies ({userMovies, onMovieAction, loadUserMovies}) {
  // const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState();
  const [shortFilm, setShortFilm] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isErrData, setIsErrData] = useState(false);

  useEffect(() => {
    if (!userMovies) loadUserMovies(setIsErrData, setIsLoading);
  }, []);

  // useEffect(() => {
  //   MainApi.getMovies()
  //     .then((res) => {
  //       setIsLoading(false);
  //       setMovies(res);
  //     })
  //     .catch(() => setIsErrData(true))
  //     .finally(() => setIsLoading(false))
  // }, []);

  const handleSearch = (searchValue, shortFilmValue) => {
    setSearch(searchValue);
    setShortFilm(shortFilmValue);
    setIsLoading(false);
  };

  // const filterMovies = () => {
  //   const regexp = new RegExp(search, 'i');
  //   return movies
  //     .filter((m) => regexp.test(m.nameRU) || regexp.test(m.nameEN))
  //     .filter((m) => (shortFilm ? m.duration <= 40 : true));
  // };

  // const filterShortFilmMovies = (shortFilm) => {
  //   return movies
  //     .filter((m) => (shortFilm ? m.duration <= 40 : true));
  // }

  // const updateMoviesList = (movie) => {
  //   setMovies(movies.filter((m) => m.movieId !== movie.movieId));
  // }

  return (
    <main className='saved-movies'>
      <SearchForm
        onSubmit={handleSearch}
        onCheckboxClick={setShortFilm}
        isMoviesLoaded={!!userMovies.length}
      />

      {!isLoading && !isErrData && (
        <MoviesCardList 
          // movies={filterMovies()}
          movies={
            userMovies
              .filter((m) => RegExp(search, 'i').test(m.nameRU) || RegExp(search, 'i').test(m.nameEN))
              .filter((m) => (shortFilm ? m.duration <= 40 : true))
          }
          // updateMoviesList={updateMoviesList}
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