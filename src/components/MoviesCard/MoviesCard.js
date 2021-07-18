// import { addHours, getMinutes, getHours, getSeconds } from 'date-fns';
import { getHours, getMinutes } from 'date-fns';
import './MoviesCard.css';

export default function MoviesCard({ movie }) {
  const { id, image, description, duration, saved } = movie;

  const convertDuration = (seconds) => {
    const date = new Date(seconds*1000);
    return `${getHours(date) - 3}ч ${getMinutes(date)}м`;
  };

  const durationStr = convertDuration(duration);

  return (
    <figure className="movie">
      <button type="button" class="movie__button">Сохранить</button>
      <img src={image} alt='Изображение не может быть показано' className='movie__picture' />
      <figcaption className='movie__caption'>
        <h2 className='movie__description'>{description}</h2>
        <p className='movie__duration'>{durationStr}</p>
      </figcaption>
    </figure>
  );
}
