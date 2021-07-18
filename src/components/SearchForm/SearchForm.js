import './SearchForm.css';

export default function SearchForm () {
  return (
    <form action='/' name='search-form' className='search-form'>
      <div className='search-form__input-block'>
        <input type='text' placeholder='Фильм' className='search-form__input'/>
        <button className='search-form__input-button'>Найти</button>
      </div>
    </form>
  );
}