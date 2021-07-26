import { useState } from 'react';
import { NavLink , useLocation } from 'react-router-dom';
import { profileURL, moviesURL, savedMoviesURL, signinURL, signupURL } from '../../utils/constants';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import accountImage from '../../images/account.svg';
import './Navigation.css';

export default function Navigation() {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const handleBurgerMenuOpen = () => setIsBurgerOpened(true);
  const handleBurgerMenuClose = () => setIsBurgerOpened(false);

  const location = useLocation();
  const pathname = location.pathname;
  const main = pathname === '/' ? true : false;

  return (
    <div className={`navigation ${main && 'navigation_main'}`}>
      {
        pathname !== '/' ? 
          (<>
            <nav className='navigation__menu'>
              <NavLink 
                to={moviesURL}
                alt='Фильмы'
                className='navigation__menu-link'
                activeClassName='navigation__menu-link_bold'
              >
                Фильмы
              </NavLink >
              <NavLink 
                to={savedMoviesURL}
                alt='Сохранённые фильмы'
                className='navigation__menu-link'
                activeClassName='navigation__menu-link_bold'
              >
                Сохранённые фильмы
              </NavLink >
            </nav>

            <NavLink  to={profileURL} alt='Профиль' className='navigation__account'>
              Аккаунт
              <img
                src={accountImage}
                alt='circle'
                className='navigation__account-logo'
              />
            </NavLink >
          </>)
        :
        (
          <>
            <NavLink  to={signupURL} alt='Регистрация' className='navigation__registration'>
              Регистрация
            </NavLink >
            <NavLink  to={signinURL} alt='Войти' className='navigation__login'>
              Войти
            </NavLink >
          </>
        )    
      }
      
      <button className='navigation__burger-menu-button' onClick={handleBurgerMenuOpen}></button>

      <BurgerMenu isOpened={isBurgerOpened} onClose={handleBurgerMenuClose}/>
    </div>
  );
}
