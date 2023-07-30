import css from './form.module.scss';

const Form = ({ children, title, width }) => {
  const style = {
    width,
  };
  return (
    <form className={css.form} style={style}>
      <h3 className={css.formHeader}>{title}</h3>
      {children}
    </form>
  );
};

export default Form;
