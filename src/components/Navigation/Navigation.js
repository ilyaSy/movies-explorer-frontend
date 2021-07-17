import { NavLink , useLocation } from 'react-router-dom';
import { profileURL, moviesURL, savedMoviesURL } from '../../utils/constants';
import accountImage from '../../images/account.svg';
import './Navigation.css';

export default function Navigation() {
  const location = useLocation();
  const pathname = location.pathname;
  const main = pathname === '/' ? true : false;

  return (
    <div className={`navigation ${main && 'navigation_main'}`}>
      {
        pathname !== '/' ? 
          (<>
            <nav className='navigation__menu'>
              <NavLink  to={moviesURL} alt='Фильмы' className='navigation__menu-link'>
                Фильмы
              </NavLink >
              <NavLink 
                to={savedMoviesURL}
                alt='Сохранённые фильмы'
                className='navigation__menu-link'
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
            <NavLink  to={moviesURL} alt='Регистрация' className='navigation__registration'>
              Регистрация
            </NavLink >
            <NavLink  to={moviesURL} alt='Войти' className='navigation__login'>
              Войти
            </NavLink >
          </>
        )    
      }
      
    </div>
  );
}
