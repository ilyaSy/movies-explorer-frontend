import './InfoTooltip.css';

export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpened && 'popup_opened'}`}>
      {
        props.children ? (
          props.children
        ) : (
          <div className='popup__container'>
            <button
              type='button'
              className='popup__close-button'
              onClick={props.onClose}
            ></button>
            {
              props.text && (
                <h2 className='popup__title'>{props.text}</h2>
              )
            }
          </div>
        )
      }
    </div>
  );
}
