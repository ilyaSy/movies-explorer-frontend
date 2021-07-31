import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signupURL } from '../../utils/constants';
import validator from 'validator';
import './Login.css';

export default function Login({ signIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidData, setIsValidData] = useState(false);
  const [isErroneous, setIsErroneous] = useState(false);

  useEffect(() => {
    if (validator.isEmail(email) && password.length >= 5) {
      setIsValidData(true);
    } else {
      setIsValidData(false);
    }
  }, [email, password]);

  const handleSetEmail = (event) => setEmail(event.target.value);
  const handleSetPassword = (event) => setPassword(event.target.value);
  // const handleSetError = () => setIsErroneous();

  const handleSubmit = (event) => {
    event.preventDefault();
    // setIsErroneous(true);
    signIn(email, password);
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
              // placeholder="Email"
              className='login__input login__input_value_email'
              minLength='7'
              maxLength='200'
              pattern='.{2,}@.{2,}\.[a-zA-Z]{2,6}'
              required
              value={email}
              onChange={handleSetEmail}
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
              // placeholder="Пароль"
              className='login__input login__input_value_password'
              minLength='5'
              maxLength='200'
              required
              value={password}
              onChange={handleSetPassword}
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
