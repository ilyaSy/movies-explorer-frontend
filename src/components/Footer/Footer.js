import { useLocation } from 'react-router-dom';
import { moviesURL, savedMoviesURL } from '../../utils/constants';
import './Footer.css';

export default function Footer(){
  const year = new Date().getFullYear();
  const location = useLocation();
  const pathname = location.pathname;
  const isFooterDisplayed = ['/', moviesURL, savedMoviesURL].includes(pathname) ? false : true;

  return ( !isFooterDisplayed ? (
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__info'>
        <p className='footer__copyright'>&copy;{year}</p>
        <ul className='footer__links'>
          <li className='footer__links-item'>
            <a href='https://praktikum.yandex.ru' target='_blank' rel='noreferrer' className='footer__link'>Яндекс.Практикум</a>
          </li>
          <li className='footer__links-item'>
            <a href='https://github.com/ilyaSy' target='_blank' rel='noreferrer' className='footer__link'>Github</a>
          </li>
          <li className='footer__links-item'>
            <a href='https://www.facebook.com/ilya.sychugov.3/' target='_blank' rel='noreferrer' className='footer__link'>Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
    ) : (
    <></>
    )
  );
}