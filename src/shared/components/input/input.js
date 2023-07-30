import css from './input.module.scss';
import { Field, ErrorMessage, useField } from 'formik';

const Input = ({ name, label, height, ...rest }) => {
  const field = useField(name);
  const style = {
    height,
  };
  return (
    <label className={css.label}>
      <span>{label}</span>
      <Field
        {...field}
        {...rest}
        name={name}
        style={style}
        className={css.input}
      />
      <ErrorMessage
        name={name}
        render={msg => <div className={css.message}>{msg}</div>}
      />
    </label>
  );
};

export default Input;
