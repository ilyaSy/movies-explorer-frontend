import { useLocation } from 'react-router-dom';
import circleImage from '../../images/circle.svg';
import { profileURL, moviesURL, savedMoviesURL, signinURL, signupURL } from '../../utils/constants';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const isPageNotFound = ['/', profileURL, moviesURL, savedMoviesURL, signinURL, signupURL].includes(pathname) ? false : true;
  const isSigninSignupURL = [signinURL, signupURL].includes(pathname) ? true : false;

  return ( !isPageNotFound ? (
    <header className={`header ${isSigninSignupURL && 'header_sign'}`}>
      <img src={circleImage} alt='circle' className='header__logo' />

      {
        !isSigninSignupURL && (
          <Navigation />
        )
      }      
    </header>
    ) : (
    <></>
    )
  );
}