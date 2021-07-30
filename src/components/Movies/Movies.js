import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { imagesApiURL } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';
import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import './Movies.css';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNoData, setIsNoData] = useState(false);
  const [isErrData, setIsErrData] = useState(false);

  useEffect(() => {
    MainApi.getMovies()
      .then((res) => {
        if (res && Array.isArray(res)) setUserMovies(res);
      })
      .catch(console.log);
  }, []);

  const handleSearch = (search, shortFilm) => {
    setIsLoading(true);
    MoviesApi.getMovies()
      .then((movies) => {
        const filteredMovies = filterMovies(movies, search, shortFilm);

        if (!filteredMovies.length) {
          setIsNoData(true);
          setIsLoading(false);
        } else {
          setMovies(filteredMovies.map((m) => createMovieCard(m)));
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsErrData(true);
      });
  };

  const filterMovies = (movies, filterValue, shortFilm) => {
    const regexp = new RegExp(filterValue, 'i');
    return movies
      .filter((m) => regexp.test(m.nameRU) || regexp.test(m.nameEN))
      .filter((m) => (shortFilm ? m.duration <= 40 : true));
  };

  const createMovieCard = (movie) => {
    return {
      country: movie.country || 'unknown',
      director: movie.director || 'unknown',
      duration: movie.duration || 404,
      year: movie.year || 1970,
      description: movie.description || 'unknown',
      image: imagesApiURL + movie.image.url || 'unknown',
      trailer: movie.trailerLink || 'unknown',
      thumbnail: imagesApiURL + movie.image.formats.thumbnail.url || 'unknown',
      movieId: movie.id || 404,
      nameRU: movie.nameRU || movie.nameEN,
      nameEN: movie.nameEN || movie.nameRU,
      saved: userMovies.map((m) => m.movieId).includes(movie.id),
    };
  };

  const updateMoviesList = (movie) => {
    setUserMovies([...userMovies, movie]);
    setMovies(movies.map((m) => m.movieId === movie.movieId ? {...movie,saved: true} : m));
  }

  return (
    <main className='movies'>
      <SearchForm onSubmit={handleSearch} />
      {!isLoading && !isNoData && !isErrData && (
        <MoviesCardList movies={movies} updateMoviesList={updateMoviesList} />
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
