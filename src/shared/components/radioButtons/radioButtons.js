import { useState } from 'react';
import css from './RadioButtons.module.scss';

const RadioButtons = ({ name, first, second, third, onChange }) => {
  const [clicked, setClicked] = useState(1);

  const onChecked = e => {
    console.log(e.target.value);
    switch (e.target.value) {
      case first:
        setClicked(1);
        break;
      case second:
        setClicked(2);
        break;
      case third:
        setClicked(3);
        break;
      default:
        return;
    }
  };
  return (
    <div className={css.radioWrapper} onClick={onChecked}>
      <label
        className={
          clicked === 1 ? `${css.first} ${css.labelSelected}` : css.first
        }
      >
        {first}
        <input type="radio" name={name} value={first} />
      </label>
      <label
        className={
          clicked === 2 ? `${css.second} ${css.labelSelected}` : css.second
        }
      >
        {second}
        <input type="radio" name={name} value={second} />
      </label>
      <label
        className={
          clicked === 3 ? `${css.third} ${css.labelSelected}` : css.third
        }
      >
        {third}
        <input type="radio" name={name} value={third} />
      </label>
    </div>
  );
};

export default RadioButtons;
