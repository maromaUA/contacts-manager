import { useDispatch } from 'react-redux';
import { logInOperation } from '../../redux/auth/operations';
import css from './login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const credentials = { email, password };
    console.log(credentials);
    dispatch(logInOperation(credentials));
  };

  return (
    <div className={css.wrapper}>
      <form className={css.formLogin} onSubmit={onFormSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button className={css.formButton} type="submit">
          Login
        </button>
        <p>
          Don't have an account ?{' '}
          <Link className={css.formLink} to="/register">
            Sing up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
