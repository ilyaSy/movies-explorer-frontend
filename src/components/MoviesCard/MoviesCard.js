import { useLocation } from 'react-router-dom';
import { savedMoviesURL } from '../../utils/constants';
import { getHours, getMinutes } from 'date-fns';
import movieSavedPic from '../../images/save.svg';
import movieDeletePic from '../../images/delete.svg';
import MainApi from '../../utils/MainApi';
import './MoviesCard.css';

export default function MoviesCard({ movie, updateMoviesList }) {
  const { id, image, nameRU, duration, trailer, _id } = movie;

  const location = useLocation();
  const pathname = location.pathname;

  const convertDuration = (minutes) => {
    const date = new Date(minutes * 60 * 1000);
    return `${getHours(date) - 3}ч ${getMinutes(date)}м`;
  };

  const handleSaveMovie = () => {
    delete movie._id;
    delete movie.owner;
    MainApi.saveMovie(movie)
      .then((resMovie) => {
        updateMoviesList(resMovie);
      })
      .catch();
  };

  const handleRemoveMovie = () => {
    MainApi.removeMovie(movie._id)
      .then((res) => {
        updateMoviesList(res.movie);
      })
      .catch(console.log);
  };

  const durationStr = convertDuration(duration);

  return (
    <figure className='movie'>
      {pathname === savedMoviesURL ? (
        <button
          type='button'
          className='movie__button movie__button_type_delete'
          onClick={handleRemoveMovie}
        >
          <img
            src={movieDeletePic}
            alt='Удалить'
            className='movie__delete-pic'
          />
        </button>
      ) : _id ? (
        <button
          type='button'
          className='movie__button movie__button_type_delete'
          onClick={handleRemoveMovie}
        >
          <img
            src={movieSavedPic} 
            alt='Сохранено'
            className='movie_saved' />
        </button>
      ) : (
        <button
          type='button'
          className='movie__button movie__button_type_saved'
          onClick={handleSaveMovie}
        >
          Сохранить
        </button>
      )}
      <a href={trailer} target='_blank' rel='noreferrer' className='movie__trailer-link'>
        <img
          src={image}
          alt={`Изображение ${id} не может быть показано`}
          className='movie__picture'
        />
      </a>
      <figcaption className='movie__caption'>
        <h2 className='movie__description'>{nameRU}</h2>
        <p className='movie__duration'>{durationStr}</p>
      </figcaption>
    </figure>
  );
}
