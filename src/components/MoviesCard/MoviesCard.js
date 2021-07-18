import { useLocation } from 'react-router-dom';
import { savedMoviesURL } from '../../utils/constants';
import { getHours, getMinutes } from 'date-fns';
import movieSavedPic from '../../images/save.svg';
import movieDeletePic from '../../images/delete.svg';
import './MoviesCard.css';

export default function MoviesCard({ movie }) {
  const { id, image, description, duration, saved } = movie;

  const location = useLocation();
  const pathname = location.pathname;

  const convertDuration = (seconds) => {
    const date = new Date(seconds * 1000);
    return `${getHours(date) - 3}ч ${getMinutes(date)}м`;
  };

  const durationStr = convertDuration(duration);

  return (
    <figure className='movie'>
      {
        pathname === savedMoviesURL ? (
          <button type='button' className='movie__button movie__button_type_delete'>
            <img src={movieDeletePic} alt='Удалить' className='movie__delete-pic' />
          </button>
        ) : (
          saved ? (
            <img src={movieSavedPic} alt='Сохранено' className='movie_saved' />
          ) : (
            <button type='button' className='movie__button movie__button_type_saved'>
              Сохранить
            </button>
          )
        )
      }
      <img
        src={image}
        alt={`Изображение ${id} не может быть показано`}
        className='movie__picture'
      />
      <figcaption className='movie__caption'>
        <h2 className='movie__description'>{description}</h2>
        <p className='movie__duration'>{durationStr}</p>
      </figcaption>
    </figure>
  );
}
