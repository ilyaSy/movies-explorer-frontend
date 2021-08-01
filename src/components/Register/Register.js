import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signinURL } from '../../utils/constants';
import useValidation from '../../utils/useValidation';
import './Register.css';

export default function Register({ signUp }) {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isErroneous, setIsErroneous] = useState(false);

  const isValidData = useValidation(fields);

  const handleSetFieldValue = (event) => setFields({...fields, [event.target.name]: event.target.value});

  const handleSubmit = (event) => {
    event.preventDefault();
    // setIsErroneous(true);
    signUp(fields.name, fields.email, fields.password);
  };

  return (
    <main className='registration'>
      <h1 className='registration__title'>Добро пожаловать!</h1>
      <form
        action='/'
        name='signup'
        className='registration__form'
        onSubmit={handleSubmit}
      >
        <fieldset className='registration__fieldset'>
          <label className='registration__input-label'>
            Имя
            <input
              type='text'
              name='name'
              className='registration__input registration__input_value_name'
              minLength='2'
              maxLength='30'
              pattern='^[a-zA-Zа-яёА-ЯЁ -]+$'
              required
              value={fields.name}
              onChange={handleSetFieldValue}
            />
            <p className='registration__error name-error'>
              Некорректная длина имени или использованы спецсимволы
            </p>
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
              value={fields.email}
              onChange={handleSetFieldValue}
            />
            <p className='registration__error email-error'>
              Некорректный формат E-mail
            </p>
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
              value={fields.password}
              onChange={handleSetFieldValue}
            />
            <p className='registration__error password-error'>
              Некорректная длина пароля
            </p>
          </label>
        </fieldset>

        <p
          className={`registration__error-update ${
            isErroneous && 'registration__error-update_opened'
          }`}
        >
          При регистрации пользователя произошла ошибка
        </p>

        <button
          className={`registration__button ${
            isValidData && 'registration__button_active'
          }`}
          type='submit'
          disabled={!isValidData}
        >
          Зарегистрироваться
        </button>
      </form>
      <p className='registration__login'>
        Уже зарегистрированы?
        <Link to={signinURL} className='registration__login-link'>
          Войти
        </Link>
      </p>
    </main>
  );
}
