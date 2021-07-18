import './Checkbox.css';

export default function Checkbox({name, value, onChange}) {
  return (
    <span
      className={`checkbox ${value && 'checkbox_checked'}`}
      onChange={onChange}
    >
      <input
        type='checkbox'
        name={name}
        className='checkbox__input'
        checked={value}
        onChange={onChange}
      />
    </span>
  );
}
