import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signupURL } from '../../utils/constants';
import useValidation from '../../utils/useValidation';
import './Login.css';

export default function Login({ signIn }) {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  const [isErroneous, setIsErroneous] = useState(false);

  const isValidData = useValidation(fields);
  
  const handleSetFieldValue = (event) => setFields({...fields, [event.target.name]: event.target.value});

  const handleSubmit = (event) => {
    event.preventDefault();
    // setIsErroneous(true);
    signIn(fields.email, fields.password);
  };

  return (
    <main className='login'>
      <h1 className='login__title'>Рады видеть!</h1>
      <form
        action='/'
        name='signin'
        className='login__form'
        onSubmit={handleSubmit}
      >
        <fieldset className='login__fieldset'>
          <label className='login__input-label'>
            E-mail
            <input
              type='text'
              name='email'
              id='email'
              className='login__input login__input_value_email'
              minLength='7'
              maxLength='200'
              pattern='.{2,}@.{2,}\.[a-zA-Z]{2,6}'
              required
              value={fields.email}
              onChange={handleSetFieldValue}
            />
            <p className='login__error email-error'>
              Некорректный формат E-mail
            </p>
          </label>

          <label className='login__input-label'>
            Пароль
            <input
              type='password'
              name='password'
              id='password'
              className='login__input login__input_value_password'
              minLength='5'
              maxLength='200'
              required
              value={fields.password}
              onChange={handleSetFieldValue}
            />
            <p className='login__error password-error'>
              Некорректная длина пароля
            </p>
          </label>
        </fieldset>

        <p
          className={`login__error-update ${
            isErroneous && 'login__error-update_opened'
          }`}
        >
          Вы ввели неправильный логин или пароль
        </p>
        <button
          className={`login__button ${isValidData && 'login__button_active'}`}
          type='submit'
          disabled={!isValidData}
        >
          Войти
        </button>
      </form>
      <p className='login__registration'>
        Ещё не зарегистрированы?
        <Link to={signupURL} className='login__registration-link'>
          Регистрация
        </Link>
      </p>
    </main>
  );
}
