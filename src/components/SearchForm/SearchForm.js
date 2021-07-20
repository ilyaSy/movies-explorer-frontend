import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
  const [shortFilm, setShortFilm] = useState(true);

  const handleSetShortFilm = (event) => setShortFilm(!shortFilm);

  return (
    <form action='/' name='search-form' className='search-form'>
      <fieldset className='search-form__fieldset'>
        <input type='text' placeholder='Фильм' className='search-form__input' />
        <button className='search-form__input-button'>Найти</button>
      </fieldset>

      <FilterCheckbox name='shortFilm' text="Короткометражки" value={shortFilm} onChange={handleSetShortFilm} />
    </form>
  );
}
