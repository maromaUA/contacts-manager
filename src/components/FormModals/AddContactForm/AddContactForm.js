import css from './AddContactForm.module.scss';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Input from '../../../shared/components/input/input';
import { useDispatch } from 'react-redux';
import { postContactOperation } from '../../../redux/contacts/operations';

const addContactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const AddContactForm = ({ title = 'Add contact', initialValues }) => {
  const dispatch = useDispatch();

  const onFormSubmit = (values, { resetForm }) => {
    dispatch(postContactOperation(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        ...initialValues,
      }}
      validationSchema={addContactSchema}
      onSubmit={onFormSubmit}
    >
      {({ handleChange }) => (
        <Form className={css.formAddContact}>
          <h3>{title}</h3>
          <Input
            label="name"
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={handleChange}
          />
          <Input
            label="email"
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Input
            label="phone"
            name="phone"
            type="phone"
            placeholder="Enter phone"
            onChange={handleChange}
          />

          <button className={css.formButton} type="submit">
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddContactForm;
