import MainHeader from '../MainHeader/MainHeader';
import photo from '../../images/me.jpg';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <section className='student'>
      <MainHeader title='Студент' />

      <div className='student__info-block'>
        <div className='student__info-text'>
          <h3 className='student__info-name'>Илья</h3>          
          <p className='student__info-job'>Фронтенд-разработчик, 30 лет</p>          
          <article className='student__info-description'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </article>
        </div>

        <ul className='student__info-links'>          
          <li className='student__info-links-item'>
            <a href='https://www.facebook.com/ilya.sychugov.3/' target='_blank' rel='noreferrer' className='student__info-link'>Facebook</a>
          </li>
          <li className='student__info-links-item'>
            <a href='https://github.com/ilyaSy' target='_blank' rel='noreferrer' className='student__info-link'>Github</a>
          </li>
        </ul>

        <img
          src={photo}
          className='student__info-photo'
          alt='Фото студента'
        />
      </div>
    </section>
  );
}
