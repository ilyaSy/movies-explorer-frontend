import { useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './SearchForm.css';

export default function SearchForm() {
  const [shortFilm, setShortFilm] = useState(true);

  const handleSetShortFilm = (event) => setShortFilm(!shortFilm);

  return (
    <form action='/' name='search-form' className='search-form'>
      <div className='search-form__input-block'>
        <input type='text' placeholder='Фильм' className='search-form__input' />
        <button className='search-form__input-button'>Найти</button>
      </div>
      <label className='search-form__checkbox-block'>
        <Checkbox name='shortFilm' value={shortFilm} onChange={handleSetShortFilm} />
        <p className='search-form__checkbox-title'>Короткометражки</p>
      </label>
    </form>
  );
}
