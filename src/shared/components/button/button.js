import css from './button.module.scss';

const Button = ({ type = 'submit', text, theme }) => {
  return (
    <button type={type} className={css.button}>
      {text}
    </button>
  );
};

export default Button;
