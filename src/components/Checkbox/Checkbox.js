import './Checkbox.css';

export default function Checkbox({value, onChange}) {
  return (
    <span
      className={`checkbox ${value && 'checkbox_checked'}`}
      onChange={onChange}
    >
      <input
        type='checkbox'
        name='shortFilm'
        className='checkbox__input'
        checked={value}
      />
    </span>
  );
}
