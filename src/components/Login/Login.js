import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signupURL } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';
import useValidation from '../../utils/useValidation';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import './Login.css';

export default function Login({ signIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  const isValidData = useValidation(fields);
  
  const handleSetFieldValue = (event) => setFields({...fields, [event.target.name]: event.target.value});

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn(fields.email, fields.password, setErrorText, setIsLoading);
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
            errorText && 'login__error-update_opened'
          }`}
        >
          {errorText}
        </p>
        <button
          className={`login__button ${(isValidData && !isLoading) && 'login__button_active'}`}
          type='submit'
          disabled={!isValidData || isLoading}
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

      <InfoTooltip isOpened={isLoading}>
        <Preloader />
      </InfoTooltip>
    </main>
  );
}
