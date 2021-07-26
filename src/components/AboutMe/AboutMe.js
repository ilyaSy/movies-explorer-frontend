import MainHeader from '../MainHeader/MainHeader';
import photo from '../../images/me.jpg';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <section id='student' className='student'>
      <MainHeader title='Студент' />

      <div className='student__info-block'>
        <div className='student__info-text'>
          <h3 className='student__info-name'>Илья</h3>          
          <p className='student__info-job'>Фронтенд-разработчик, 33 лет</p>          
          <article className='student__info-description'>
            Я родился и живу в Москве, закончил факультет прикладной математики 
            МГТУ им Н.Э.Баумана. Есть кошка Кассандра. Я люблю фильмы с Джиммом
            Кэрри, а ещё кататься на велосипеде. Программировать начал ещё в 
            институте, но до последней работы в основном занимался математическим
            моделированием, а потом решил переориентироваться и заняться фронтендом.
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
