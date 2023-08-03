import { useSelector } from 'react-redux';
import css from './ThemeSwitch.module.scss';
import { selectTheme } from '../../../redux/auth/selectors';

const ThemeSwitch = ({ handleTheme }) => {
  // const [theme, setTheme] = useSelector(selectTheme);
  const theme = useSelector(selectTheme);
  console.log(theme);
  const handleOnClick = e => {
    if (e.target.id === 'toogleTheme') {
      console.log(e.target.checked);
      e.target.checked ? handleTheme('dark') : handleTheme('light');
    }
  };
  return (
    <>
      <label className={css.toggleLabel} onClick={handleOnClick}>
        <input
          className={css.toggleInput}
          name="toogleTheme"
          type="checkbox"
          id="toogleTheme"
          defaultChecked={theme === 'dark' ? true : false}
        />
        <div className={css.toggleFill}></div>
      </label>
    </>
  );
};

export default ThemeSwitch;
