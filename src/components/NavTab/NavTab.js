import './NavTab.css';

export default function NavTab(){
  return (
    <ul className='main-nav'>
      <li className='main-nav__item'>
        <a href='#project' className='main-nav__link'>О проекте</a>
      </li>
      <li className='main-nav__item'>
        <a href='#techs' className='main-nav__link'>Технологии</a>
      </li>
      <li className='main-nav__item'>
        <a href='#student' className='main-nav__link'>Студент</a>
      </li>
    </ul>
  );
}