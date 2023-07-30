import css from './FormMessage.module.scss';

const FormMessage = ({ type, children }) => {
  const style = {
    color: type === 'ok' ? 'green' : 'red',
  };

  return (
    <p style={style} className={css.message}>
      {children}
    </p>
  );
};

export default FormMessage;
