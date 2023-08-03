import css from './ResendEmail.module.scss';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from '../../../shared/components/input/input';
import Button from '../../../shared/components/button/button';
import { useState } from 'react';
import { verifyEmailOperation } from '../../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import FormMessage from '../../../shared/components/FormMessage/FormMessage';

const sendEmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ResendEmail = () => {
  const [info, setInfo] = useState(false);

  const dispatch = useDispatch();

  const onModalSumbit = async email => {
    const result = await dispatch(verifyEmailOperation(email));
    if (result.error) {
      setInfo('fail');
    }
    setInfo('ok');
  };
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={sendEmailSchema}
      onSubmit={onModalSumbit}
    >
      {({ handleChange }) => (
        <Form className={css.formModal}>
          <h3>Resend email</h3>
          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />

          <Button>Send</Button>
          <FormMessage type={info}>
            {info === 'ok'
              ? 'Email sent'
              : 'Email alredy confirmed or never registered'}
          </FormMessage>
        </Form>
      )}
    </Formik>
  );
};

export default ResendEmail;
