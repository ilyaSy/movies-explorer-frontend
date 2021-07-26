import { NavLink } from 'react-router-dom';
import { profileURL, moviesURL, savedMoviesURL } from '../../utils/constants';
import accountImage from '../../images/account.svg';
import burgerCloseImage from '../../images/burgerClose.svg';
import './BurgerMenu.css';

export default function BurgerMenu({ isOpened, onClose }) {
  const handleCloseOverlay = (event) => {
    if (isOpened && event.target.classList.contains('burger_opened')) {
      onClose();
    }
  };

  return (
    <div
      className={`burger ${isOpened && 'burger_opened'}`}
      onClick={handleCloseOverlay}
    >
      <nav className='burger__menu-list'>
        <button className='burger__button-close' onClick={onClose}>
          <img src={burgerCloseImage} alt='Закрыть меню' className='burger__button-close-image'/>
        </button>
        <ul className='burger__menu'>
          <li className='burger__menu-items'>
            <NavLink
              exact
              to='/'
              className='burger__menu-link'
              activeClassName='burger__menu-link_underlined'
              onClick={onClose}
            >
              Главная
            </NavLink>
          </li>
          <li className='burger__menu-items'>
            <NavLink
              to={moviesURL}
              className='burger__menu-link'
              activeClassName='burger__menu-link_underlined'
              onClick={onClose}
            >
              Фильмы
            </NavLink>
          </li>
          <li className='burger__menu-items'>
            <NavLink
              to={savedMoviesURL}
              className='burger__menu-link'
              activeClassName='burger__menu-link_underlined'
              onClick={onClose}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>

        <NavLink to={profileURL} alt='Профиль' className='burger__account' onClick={onClose}>
          Аккаунт
          <img
            src={accountImage}
            alt='circle'
            className='burger__account-logo'
          />
        </NavLink>
      </nav>
    </div>
  );
}
