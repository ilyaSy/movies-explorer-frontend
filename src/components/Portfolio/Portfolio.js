import './Portfolio.css';

export default function Portfolio(){
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>

      <ul className='portfolio__links'>
        <li className='portfolio__links-item'>
          <a href='https://ilyasy.github.io/how-to-learn/' rel='noreferer' alt='Статичный сайт' className='portfolio__link'>
            Статичный сайт
          </a>
        </li>
        <li className='portfolio__links-item'>
          <a href='https://ilyasy.github.io/mesto/' rel='noreferer' alt='Адаптивный сайт' className='portfolio__link'>
            Адаптивный сайт
          </a>
        </li>
        <li className='portfolio__links-item'>
          <a href='https://ilyasy.github.io/react-mesto-auth/' rel='noreferer' alt='SPA' className='portfolio__link'>
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}