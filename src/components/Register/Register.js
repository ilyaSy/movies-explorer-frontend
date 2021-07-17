import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signupURL } from '../../utils/constants';
import './Register.css';

export default function Register() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const handleSetEmail = (event) => setEmail(event.target.value);
  const handleSetName = (event) => setName(event.target.value);
  const handleSetPassword = (event) => setPassword(event.target.value);

  return (
    <main className='registration'>
      <h1 className='registration__title'>Добро пожаловать!</h1>
      <form action='/' name='signup' className='registration__fieldset'>
        <label className='registration__input-label'>
          Имя
          <input
            type='text'
            name='name'
            className='registration__input registration__input_value_name'
            minLength='2'
            maxLength='30'
            pattern='[a-zA-Zа-яёА-ЯЁ0-9]+'
            required
            value={name}
            onChange={handleSetName}
          />
          <p className='registration__error name-error'>Что-то пошло не так...</p>
        </label>

        <label className='registration__input-label'>
          E-mail
          <input
            type='text'
            name='email'
            className='registration__input registration__input_value_name'
            minLength='7'
            maxLength='200'
            pattern='.{2,}@.{2,}\.[a-zA-Z]{2,6}'
            required
            value={email}
            onChange={handleSetEmail}
          />
          <p className='registration__error email-error'>Что-то пошло не так...</p>
        </label>

        <label className='registration__input-label'>
          Пароль
          <input
            type='password'
            name='password'
            className='registration__input registration__input_value_password'
            minLength='5'
            maxLength='200'
            required
            value={password}
            onChange={handleSetPassword}
          />
          <p className='registration__error password-error'>Что-то пошло не так...</p>
        </label>
      </form>
      <button className='registration__button'>Зарегистрироваться</button>
      <p className='registration__registration'>
        Уже зарегистрированы ?
        <Link to={signupURL} className='registration__registration-link'>
          Войти
        </Link>
      </p>
    </main>
  );
}
