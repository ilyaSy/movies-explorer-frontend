import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { signoutURL } from '../../utils/constants';
import './Profile.css';

export default function Profile() {
  // const [email, setEmail] = useState('kuzya@mail.ru');
  const email = 'kuzya@mail.ru';
  const [name, setName] = useState('Илья');
  const [isEditable, setIsEditable] = useState(false);
  
  const defaultName = 'Илья';

  // const handleSetEmail = (event) => setEmail(event.target.value);
  const handleSetName = (event) => {
    event.target.value !== defaultName ? 
      setIsEditable(true) : setIsEditable(false);
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  }

  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, Илья!</h1>
      <form action='/' name='signup' className='profile__fieldset' onSubmit={handleSubmit}>
        <label className='profile__input-label'>Имя</label>
        <input
          type='text'
          name='name'
          className='profile__input profile__input_value_name'
          minLength='2'
          maxLength='30'
          pattern='[a-zA-Zа-яёА-ЯЁ0-9]+'
          required
          value={name}
          onChange={handleSetName}
        />
        <p className='profile__error name-error'>Что-то пошло не так...</p>

        <label className='profile__input-label'>E-mail</label>
        <input
          type='text'
          name='email'
          className='profile__input profile__input_value_email'
          minLength='7'
          maxLength='200'
          pattern='.{2,}@.{2,}\.[a-zA-Z]{2,6}'
          required
          value={email}
          disabled
        />
        <p className='profile__error email-error'>Что-то пошло не так...</p>
      </form>
      <button
        className={`profile__button profile__button_type_edit ${
          !isEditable && 'profile__button_disabled'
        }`}
        type='submit'
      >
        Редактировать
      </button>
      <button className='profile__button profile__button_type_logout'>
        Выйти из аккаунта
      </button>
    </main>
  );
}
