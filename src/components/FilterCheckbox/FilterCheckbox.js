import './FilterCheckbox.css';

export default function Checkbox({name, value, text, onChange, onSubmit}) {
  const handleChange = (event) => {
    onChange(event);
    onSubmit(event);
  }

  return (
    <label className='checkbox'>
      <input
          type='checkbox'
          name={name}
          className='checkbox__input'
          checked={value}
          onChange={handleChange}
        />
      <span
        className={`checkbox__pic ${value && 'checkbox__pic_checked'}`}
        onChange={handleChange}
      >
      </span>
      <h3 className='checkbox__title'>{text}</h3>
    </label>
  );
}
