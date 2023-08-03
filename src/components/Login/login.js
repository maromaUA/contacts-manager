import { useDispatch } from 'react-redux';
import { logInOperation } from '../../redux/auth/operations';
import css from './login.module.scss';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import Input from '../../shared/components/input/input';
import Button from '../../shared/components/button/button';
import FormMessage from '../../shared/components/FormMessage/FormMessage';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const onFormSubmit = async (credentials, { resetForm }) => {
    const result = await dispatch(logInOperation(credentials));

    if (result.error) {
      setError(true);
      return;
    }
    resetForm();
  };

  return (
    <div className={css.wrapper}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={onFormSubmit}
      >
        {({ handleChange }) => (
          <Form className={css.form}>
            <h3>Login</h3>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
            />

            {error && <FormMessage>Wrong password or email</FormMessage>}
            <Button>Login</Button>
            <p>
              Don't have an account ?{' '}
              <Link className={css.formLink} to="/register">
                Sing up
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
