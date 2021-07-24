import './PopupError.css';

export default function PopupError({ isOpened, text, onClose }) {
  return (
    <div className={`popup ${isOpened && 'popup_opened'}`}>
      <div className='popup__container'>
        <h2 className='popup__error-title'>Ошибка!</h2>
        <p className='popup__error-text'>{text}Тут произошла какая-то ошибка</p>
        <button type='button' className='popup__close-button' onClick={onClose}>
          {/* Закрыть */}
        </button>
      </div>
    </div>
  );
}
