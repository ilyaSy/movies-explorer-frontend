// import React from 'react';
// import PopupWithForm from './PopupWithForm';
// import registerSuccess from '../images/register_success.svg';
// import registerFail from '../images/register_fail.svg';
import './InfoTooltip.css';

export default function InfoTooltip({isOpened, onClose, success, text}){
  return (
    <div className={`popup ${isOpened && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        {/* <fieldset className="popup__fieldset"> */}
          <h2 className="popup__title">{text}</h2>
            {/* {success ?
            (<figure className="popup__tooltip">
              <img src={registerSuccess} alt="Регистрация: успех"/>
              <figcaption className="popup__title">Вы успешно зарегистрировались</figcaption>
            </figure>) :
            (<figure className="popup__tooltip">
              <img src={registerFail} alt="Регистрация: ошибка"/>
              <figcaption className="popup__title">Что-то пошло не так! Попробуйте ещё раз.</figcaption>
            </figure>) */}
          {/* {props.btnName && (<button type="submit" className="popup__save-button">{props.btnName}</button>)} */}
        {/* </fieldset> */}
        </div>
    </div>
    // <PopupWithForm isOpen={ isOpened } onClose={onClose}>
    //   {
        
    //   }
    // </PopupWithForm>
  )
}