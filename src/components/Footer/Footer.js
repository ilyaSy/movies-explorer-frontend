import { useLocation } from 'react-router-dom';
import { profileURL, moviesURL, savedMoviesURL } from '../../utils/constants';
import './Footer.css';

export default function Footer(){
  const year = new Date().getFullYear();
  const location = useLocation();
  const pathname = location.pathname;
  const isPageNotFound = ['/', profileURL, moviesURL, savedMoviesURL].includes(pathname) ? false : true;

  return ( !isPageNotFound ? (
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__info'>
        <p className='footer__copyright'>&copy;{year}</p>
        <ul className='footer__links'>
          <li className='footer__links-item'>
            <a href='' target='_blank' className='footer__link'>Яндекс.Практикум</a>
          </li>
          <li className='footer__links-item'>
            <a href='' target='_blank' className='footer__link'>Github</a>
          </li>
          <li className='footer__links-item'>
            <a href='' target='_blank' className='footer__link'>Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
    ) : (
    <></>
    )
  );
}