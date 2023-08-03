import { useDispatch, useSelector } from 'react-redux';
import css from './homepage.module.scss';
import {
  getContactsOperation,
  changeFavoriteOperation,
  deleteContactOperation,
  updateContactOperation,
} from '../../redux/contacts/operations';
import { useEffect, useState } from 'react';
import { getContacts } from '../../redux/contacts/selectors';
import { FaHeart, FaTrash } from 'react-icons/fa6';

import Modal from '../../shared/components/modal/Modal';
import AddContactForm from '../FormModals/AddContactForm';

const Homepage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    dispatch(getContactsOperation());
  }, [dispatch]);

  async function onFavoriteHandler(id, favorite) {
    const body = { favorite: !favorite };
    console.log(body);
    const result = await dispatch(changeFavoriteOperation({ id, body }));
    console.log(result);
  }
  async function onDeleteHandler(id) {
    const result = await dispatch(deleteContactOperation(id));
    console.log(result);
  }

  async function editNameHandler(e, email, phone, favorite, id) {
    console.log(e);
    const body = {
      name: e.currentTarget.textContent,
      email,
      phone,
      favorite,
    };
    const result = await dispatch(updateContactOperation({ id, body }));
    console.log('result:', result);
    if (result.meta.requestStatus === 'rejected') {
      alert('wrong name');
    }
  }

  function editEmailHandler(e, name, phone, favorite, id) {
    const body = {
      email: e.currentTarget.textContent,
      name,
      phone,
      favorite,
    };
    dispatch(updateContactOperation({ id, body }));
  }

  function editPhoneHandler(e, name, email, favorite, id) {
    const body = {
      phone: e.currentTarget.textContent,
      name,
      email,
      favorite,
    };
    dispatch(updateContactOperation({ id, body }));
    console.log(e);
  }

  const result = contacts.map(({ _id, name, email, phone, favorite }) => (
    <li key={_id} className={css.contact}>
      <div className={css.liContent}>
        <p>
          Name:
          <span
            contentEditable="true"
            onInput={e => editNameHandler(e, email, phone, favorite, _id)}
          >
            {name}
          </span>
        </p>
        <p>
          Email:
          <span
            contentEditable="true"
            onInput={e => editEmailHandler(e, name, phone, favorite, _id)}
          >
            {email}
          </span>
        </p>
        <p>
          Phone:
          <span
            contentEditable="true"
            onInput={e => editPhoneHandler(e, name, email, favorite, _id)}
          >
            {phone}
          </span>
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
