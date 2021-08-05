import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ onSubmit, onCheckboxClick, isMoviesLoaded }) {
  const [shortFilm, setShortFilm] = useState(false);
  const [search, setSearch] = useState('');

  const handleSetShortFilm = () => {
    setShortFilm(!shortFilm);
    
    if (isMoviesLoaded) onCheckboxClick(!shortFilm);
  };
  const handleSetSearch = (event) => setSearch(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit( search, shortFilm );
  }

  return (
    <form action='/' name='search-form' className='search-form' onSubmit={handleSubmit}>
      <fieldset className='search-form__fieldset'>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input'
          value={search}
          onChange={handleSetSearch}
          required
        />
        <button className='search-form__input-button' type='submit'>Найти</button>
      </fieldset>

      <FilterCheckbox
        name='shortFilm'
        text='Короткометражки'
        value={shortFilm}
        onChange={handleSetShortFilm}
      />
    </form>
  );
}
