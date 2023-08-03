import { useDispatch, useSelector } from 'react-redux';
import css from './homepage.module.scss';
import {
  getContactsOperation,
  changeFavoriteOperation,
  deleteContactOperation,
} from '../../redux/contacts/operations';
import { useEffect, useState } from 'react';
import { getContacts } from '../../redux/contacts/selectors';
import { FaHeart, FaTrash, FaPen } from 'react-icons/fa6';

import Modal from '../../shared/components/modal/Modal';
import AddContactForm from '../../components/FormModals/AddContactForm/AddContactForm';

const Homepage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editInitialValues, setEditInitialValues] = useState({});

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onEditOpen = () => setOpenEdit(true);
  const onEditClose = () => setOpenEdit(false);

  const onEditHandler = (name = '', email = '', phone = '') => {
    setEditInitialValues(editInitialValues => ({
      ...editInitialValues,
      name,
      email,
      phone,
    }));
    onEditOpen();
  };

  useEffect(() => {
    dispatch(getContactsOperation());
  }, [dispatch]);

  const onFavoriteHandler = (id, favorite) => {
    const body = { favorite: !favorite };

    dispatch(changeFavoriteOperation({ id, body }));
  };
  const onDeleteHandler = id => {
    dispatch(deleteContactOperation(id));
  };

  const result = contacts.map(({ _id, name, email, phone, favorite }) => (
    <li key={_id} className={css.contact}>
      <div className={css.liContent}>
        <p>
          Name: <span>{name}</span>
        </p>
        <p>
          Email: <span>{email}</span>
        </p>
        <p>
          Phone: <span>{phone}</span>
        </p>
      </div>
      <ul className={css.liActions}>
        <li onClick={() => onFavoriteHandler(_id, favorite)}>
          <FaHeart
            color={favorite ? 'red' : 'gray'}
            border="black"
            size="25px"
          />
        </li>
        <li onClick={() => onEditHandler(name, email, phone)}>
          <FaPen size="25px" />
        </li>
        <li onClick={() => onDeleteHandler(_id)}>
          <FaTrash size="25px" />
        </li>
      </ul>
    </li>
  ));

  return (
    <>
      {open && (
        <Modal onClose={onCloseModal}>
          <AddContactForm />
        </Modal>
      )}
      {openEdit && (
        <Modal onClose={onEditClose}>
          <AddContactForm
            title="Edit contact"
            initialValues={editInitialValues}
          />
        </Modal>
      )}
      <div className={css.wrapper}>
        <button className={css.addButton} type="button" onClick={onOpenModal}>
          Add Contact
        </button>

        <h2>List of contacts</h2>

        <ul className={css.listContacts}>{result}</ul>
      </div>
    </>
  );
};

export default Homepage;
