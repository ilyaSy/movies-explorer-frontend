import { useLocation } from 'react-router-dom';
import circleImage from '../../images/circle.svg';
import { profileURL, moviesURL, savedMoviesURL } from '../../utils/constants';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const isPageNotFound = ['/', profileURL, moviesURL, savedMoviesURL].includes(pathname) ? false : true;

  return ( !isPageNotFound ? (
    <header className='header'>
      <img src={circleImage} alt='circle' className='header__logo' />

      <Navigation />
    </header>
    ) : (
    <></>
    )
  );
}
