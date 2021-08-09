import { useContext, useEffect, useState } from 'react';
import MainApi from '../../utils/MainApi';
import errorHandler from '../../utils/errorHandler';
import useValidation from '../../utils/useValidation';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

export default function Profile({ signOut, onTooltipOpen, setInfoText }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [baseName, setBaseName] = useState(currentUser.name);
  const [isEditable, setIsEditable] = useState(false);
  const [errorText, setErrorText] = useState('');

  const email = currentUser.email;
  const isValidData = useValidation({ name: name });

  useEffect(() => {
    setName(currentUser.name);
    setBaseName(currentUser.name);
  }, [currentUser]);

  useEffect(() => {
    setIsEditable(name !== baseName);
  }, [name, baseName]);

  const handleSetName = (event) => setName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    MainApi.patchMe({ name, email })
      .then((userData) => {
        setName(userData.name);
        setBaseName(userData.name);
        setInfoText('Данные успешно обновлены!');
        onTooltipOpen();
      })
      .catch((err) => setErrorText(errorHandler(err.status, 'profile')))
      .finally(() => setIsLoading(false));
  };

  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, {baseName}!</h1>
      <form
        action='/'
        name='signup'
        className='profile__form'
        onSubmit={handleSubmit}
      >
        <fieldset className='profile__fieldset'>
          <label className='profile__input-label'>Имя</label>
          <input
            type='text'
            name='name'
            id='name'
            className='profile__input profile__input_value_name'
            minLength='2'
            maxLength='30'
            pattern='^[a-zA-Zа-яёА-ЯЁ -]+$'
            required
            value={name}
            onChange={handleSetName}
          />
          <p className='profile__error name-error'>
            Некорректная длина имени или использованы спецсимволы
          </p>

          <label className='profile__input-label'>E-mail</label>
          <input
            type='text'
            name='email'
            id='email'
            className='profile__input profile__input_value_email'
            minLength='7'
            maxLength='200'
            pattern='.{2,}@.{2,}\.[a-zA-Z]{2,6}'
            required
            value={email}
            disabled
          />
        </fieldset>

        <p
          className={`profile__error-update ${
            errorText && 'profile__error-update_opened'
          }`}
        >
          {errorText}
        </p>
        <button
          className={`profile__button profile__button_type_edit ${
            (!isEditable || !isValidData) && 'profile__button_disabled'
          }`}
          disabled={!isEditable || !isValidData}
          type='submit'
        >
          Редактировать
        </button>
      </form>
      <button
        className='profile__button profile__button_type_logout'
        onClick={signOut}
      >
        Выйти из аккаунта
      </button>

      <InfoTooltip isOpened={isLoading}>
        <Preloader />
      </InfoTooltip>
    </main>
  );
}
