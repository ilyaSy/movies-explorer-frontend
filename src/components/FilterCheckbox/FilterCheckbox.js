import './FilterCheckbox.css';

export default function Checkbox({name, value, text, onChange}) {
  return (
    <label className='checkbox'>
      <input
          type='checkbox'
          name={name}
          className='checkbox__input'
          checked={value}
          onChange={onChange}
        />
      <span
        className={`checkbox__pic ${value && 'checkbox__pic_checked'}`}
        onChange={onChange}
      >
      </span>
      <h3 className='checkbox__title'>{text}</h3>
    </label>
  );
}
