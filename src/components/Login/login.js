import { useDispatch } from 'react-redux';
import { logInOperation } from '../../redux/auth/operations';
import css from './login.module.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onFormSubmit = async credentials => {
    const result = await dispatch(logInOperation(credentials));

    if (result.error) {
      setError(true);
    }
  };

  return (
    <div className={css.wrapper}>
      <form className={css.formLogin} onSubmit={handleSubmit(onFormSubmit)}>
        <h2>Login</h2>
        <label className={css.inputDesc}>
          <span>Email</span>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Required field' })}
          />
          <p className={css.inputError}>
            {errors?.email && errors.email.message}
          </p>
        </label>
        <label className={css.inputDesc}>
          <span>Password</span>
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Required field' })}
          />
          <p className={css.inputError}>
            {errors?.password && errors.password.message}
          </p>
        </label>
        {error && <p className={css.inputError}>Wrong password or email</p>}
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
