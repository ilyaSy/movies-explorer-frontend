import arrowPic from '../../images/arrowDiag.svg';
import './Portfolio.css';

export default function Portfolio(){
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>

      <ul className='portfolio__links'>
        <li className='portfolio__links-item'>
          <a href='' rel='noreferer' alt='Статичный сайт' className='portfolio__link'>
            Статичный сайт
            <img src={arrowPic} alt='Стрелка переход на сайт' />
          </a>
        </li>
        <li className='portfolio__links-item'>
          <a href='' rel='noreferer' alt='Адаптивный сайт' className='portfolio__link'>
            Адаптивный сайт
            <img src={arrowPic} alt='Стрелка переход на сайт' />
          </a>
        </li>
        <li className='portfolio__links-item'>
          <a href='' rel='noreferer' alt='SPA' className='portfolio__link'>
            Одностраничное приложение
            <img src={arrowPic} alt='Стрелка переход на сайт' />
          </a>
        </li>
      </ul>
    </section>
  );
}