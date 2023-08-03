import { useDispatch } from 'react-redux';
import { registerOperation } from '../../redux/auth/operations';
import css from './registration.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Input from '../../shared/components/input/input';

import FormMessage from '../../shared/components/FormMessage/FormMessage';
import Modal from '../../shared/components/modal/Modal';
import ResendEmail from '../../components/FormModals/ResendEmailForm/ResendEmail';

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
      setInfo('fail');
    }
    setInfo('ok');
    resetForm();
  };

  return (
    <div className={css.wrapper}>
      {open && (
        <Modal onClose={onCloseModal}>
          <ResendEmail />
        </Modal>
      )}

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
        {({ handleChange }) => (
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

            {info === 'ok' && (
              <FormMessage type={info}>
                Check your email and confirm
              </FormMessage>
            )}
            {info === 'fail' && (
              <FormMessage type={info}>Email is already used</FormMessage>
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
