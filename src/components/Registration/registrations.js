import { useDispatch } from 'react-redux';
import {
  registerOperation,
  verifyEmailOperation,
} from '../../redux/auth/operations';
import css from './registration.module.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';

const Registration = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState(false);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onFormSubmit = async ({ name, email, password }) => {
    const credentials = { name, email, password };

    const result = await dispatch(registerOperation(credentials));
    if (result.error) {
      setInfo('red');
    }
    setInfo('green');
  };
  const onModalSumbit = e => {
    e.preventDefault();
    const email = e.currentTarget.confirm.value;
    dispatch(verifyEmailOperation({ email }));
    setOpen(false);
    setInfo('green');
  };

  return (
    <div className={css.wrapper}>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNameNames={{
          overlay: css.customOverlay,
          modal: css.customModal,
        }}
      >
        <form className={css.modalRegister} onSubmit={onModalSumbit}>
          <label className={css.inputDesc}>
            <span>Email</span>
            <input
              className={css.inputForm}
              type="email"
              placeholder="Enter email"
              name="confirm"
            />
            <p className={css.inputError}>
              {errors?.email && errors.email.message}
            </p>
          </label>
          <button className={css.formButton} type="submit">
            Send
          </button>
        </form>
      </Modal>
      <form className={css.formRegister} onSubmit={handleSubmit(onFormSubmit)}>
        <h2>Sign Up</h2>
        <label className={css.inputDesc}>
          <span>Name</span>
          <input
            className={css.inputForm}
            type="text"
            placeholder="Enter name"
            {...register('name', {
              required: 'Name is required',
            })}
          />

          <p className={css.inputError}>
            {errors?.name && errors.name.message}
          </p>
        </label>
        <label className={css.inputDesc}>
          <span>Email</span>
          <input
            className={css.inputForm}
            type="email"
            placeholder="Enter email"
            {...register('email', {
              required: 'Email is required',
              minLength: {
                value: 6,
                message: 'minimum length 6 characters',
              },
            })}
          />
          <p className={css.inputError}>
            {errors?.email && errors.email.message}
          </p>
        </label>
        <label className={css.inputDesc}>
          <span>Password</span>
          <input
            className={css.inputForm}
            type="password"
            placeholder="Enter password"
            {...register('password', { required: 'Password is required' })}
          />
          <p className={css.inputError}>
            {errors?.password && errors.password.message}
          </p>
        </label>
        <label className={css.inputDesc}>
          <span>Confirm password</span>
          <input
            className={css.inputForm}
            type="password"
            placeholder="Confirm password"
            {...register('confirmPass', {
              required: 'Confirm password is required',
              validate: val => {
                if (watch('password') !== val) {
                  return "Passwords don't match";
                }
              },
            })}
          />
          <p className={css.inputError}>
            {errors?.confirmPass && errors.confirmPass.message}
          </p>
        </label>
        {info === 'red' && (
          <p className={css.inputError}>This email is already used</p>
        )}
        {info === 'green' && (
          <p className={css.inputSuccess}>Check your email and confirm it</p>
        )}
        <button className={css.formButton} type="submit">
          Register
        </button>
        <p>
          Already have an account ?{' '}
          <Link className={css.formLink} to="/">
            Sing in
          </Link>
        </p>
        <p>
          <span onClick={onOpenModal} className={css.formLink}>
            Send
          </span>{' '}
          me confirm message again
        </p>
      </form>
    </div>
  );
};

export default Registration;
