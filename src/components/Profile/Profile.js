import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { signoutURL } from '../../utils/constants';
import './Profile.css';

export default function Profile() {
  const [email, setEmail] = useState('kuzya@mail.ru');
  const [name, setName] = useState('Илья');
  const [isEditable, setIsEditable] = useState(false);

  const handleSetEmail = (event) => setEmail(event.target.value);
  const handleSetName = (event) => setName(event.target.value);
  const handleSetIsEditable = (event) => setIsEditable(!isEditable);

  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, Илья!</h1>
      <form action='/' name='signup' className='profile__fieldset'>
        <label className='profile__input-label'>
          Имя
        </label>
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

        <label className='profile__input-label'>
          E-mail
        </label>
        <input
            type='text'
            name='email'
            className='profile__input profile__input_value_name'
            minLength='7'
            maxLength='200'
            pattern='.{2,}@.{2,}\.[a-zA-Z]{2,6}'
            required
            value={email}
            onChange={handleSetEmail}
          />
          <p className='profile__error email-error'>Что-то пошло не так...</p>
      </form>
      {isEditable ? (
        <button className='profile__button profile__button_type_save' onClick={handleSetIsEditable}>Сохранить</button>
      )
      : (
        <button className='profile__button profile__button_type_edit' onClick={handleSetIsEditable}>Редактировать</button>
      )}
      <button className='profile__button profile__button_type_logout'>Выйти из аккаунта</button>
    </main>
  );
}
