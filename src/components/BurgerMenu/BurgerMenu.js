import { NavLink } from 'react-router-dom';
import { profileURL, moviesURL, savedMoviesURL } from '../../utils/constants';
import accountImage from '../../images/account.svg';
import './BurgerMenu.css';

export default function BurgerMenu ({isOpened, onClose}) {
  const handleCloseOverlay = (event) => {
    if (isOpened && event.target.classList.contains('burger_opened')) {
      onClose();
    }
  }

  return (
    <div className={`burger ${isOpened && 'burger_opened'}`} onClick={handleCloseOverlay}>
      <nav className='burger__menu-list'>
        <ul className='burger__menu'>
          <li><NavLink to={moviesURL} className='burger__menu-link'>Главная</NavLink></li>
          <li><NavLink to={moviesURL} className='burger__menu-link'>Фильмы</NavLink></li>
          <li><NavLink to={savedMoviesURL} className='burger__menu-link'>Сохранённые фильмы</NavLink></li>
        </ul>

        <NavLink to={profileURL} alt='Профиль' className='burger__account'>
          Аккаунт
          <img
            src={accountImage}
            alt='circle'
            className='burger__account-logo'
          />
        </NavLink >
      </nav>
    </div>
  )
}