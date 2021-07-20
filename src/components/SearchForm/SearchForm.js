import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
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

      <FilterCheckbox name='shortFilm' text="Короткометражки" value={shortFilm} onChange={handleSetShortFilm} />

      {/* <label className='search-form__checkbox-block'>
        <FilterCheckbox name='shortFilm' value={shortFilm} onChange={handleSetShortFilm} />
        <p className='search-form__checkbox-title'>Короткометражки</p>
      </label> */}
    </form>
  );
}
