import { useDispatch } from 'react-redux';
import { registerOperation } from '../../redux/auth/operations';
import css from './registration.module.css';
import { Link } from 'react-router-dom';

const Registration = () => {
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const name = e.currentTarget.name.value;
    const credentials = { email, password, name };
    console.log(credentials);
    dispatch(registerOperation(credentials));
  };

  return (
    <div className={css.wrapper}>
      <form className={css.formRegister} onSubmit={onFormSubmit}>
        <h2>Sign Up</h2>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input
          type="password"
          name="confirmPass"
          placeholder="Confirm password"
        />
        <button className={css.formButton} type="submit">
          Register
        </button>
        <p>
          Already have an account ?{' '}
          <Link className={css.formLink} to="/">
            Sing in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
