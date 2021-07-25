import { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { signoutURL } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

export default function Profile() {
  const currentUser = useContext(CurrentUserContext);
  const email = currentUser.email;
  const [name, setName] = useState(currentUser.name);
  const [isEditable, setIsEditable] = useState(false);
  const [isErroneous, setIsErroneous] = useState(false);
  
  const defaultName = currentUser.name;

  // const handleSetEmail = (event) => setEmail(event.target.value);
  const handleSetName = (event) => {
    event.target.value !== defaultName ? 
      setIsEditable(true) : setIsEditable(false);
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsErroneous(true);
  }

  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, {defaultName}!</h1>
      <form action='/' name='signup' className='profile__form' onSubmit={handleSubmit}>
        <fieldset className='profile__fieldset'>
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
          <p className='profile__error name-error'>Некорректная длина имени или использованы спецсимволы</p>

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
        </fieldset>

        <p className={`profile__error-update ${isErroneous && 'profile__error-update_opened'}`}>
          При обновлении профиля произошла какая-то ошибка
        </p>
        <button
          className={`profile__button profile__button_type_edit ${
            !isEditable && 'profile__button_disabled'
          }`}
          type='submit'
        >
          Редактировать
        </button>
      </form>
      <button className='profile__button profile__button_type_logout'>
        Выйти из аккаунта
      </button>
    </main>
  );
}
