import { useDispatch } from 'react-redux';
import {
  registerOperation,
  verifyEmailOperation,
} from '../../redux/auth/operations';
import css from './registration.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Input from '../../shared/components/input/input';
import Button from '../../shared/components/button/button';
import FormMessage from '../../shared/components/FormMessage/FormMessage';

const RegistrSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  confirmPass: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Required'),
});

const Registration = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState(false);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onFormSubmit = async (credentials, { resetForm }) => {
    const { email, password, name } = credentials;

    const result = await dispatch(registerOperation({ email, password, name }));
    if (result.error) {
      setInfo('red');
    }
    setInfo('green');
    resetForm();
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
        <Form className={css.form}>
          <h3>Sign Up</h3>
          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            name="confirm"
          />

          <p className={css.inputError}></p>

          <Button text="Send" />
        </Form>
      </Modal>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPass: '',
        }}
        validationSchema={RegistrSchema}
        onSubmit={onFormSubmit}
      >
        {({ errors, touched, handleChange }) => (
          <Form className={css.form}>
            <h3>Sing Up</h3>
            <Input
              label="Name"
              name="name"
              type="text"
              placeholder="Enter name"
              height="30px"
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter email"
              height="30px"
              onChange={handleChange}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              height="30px"
              onChange={handleChange}
            />

            <Input
              label="Confirm password"
              name="confirmPass"
              type="password"
              placeholder="Repeat password"
              height="30px"
              onChange={handleChange}
            />

            {info === 'red' && (
              <FormMessage>This email is already used</FormMessage>
            )}
            {info === 'green' && (
              <FormMessage type="ok">
                {' '}
                Check your email and confirm it
              </FormMessage>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
