import { useDispatch, useSelector } from 'react-redux';
import css from './homepage.module.css';
import {
  getContactsOperation,
  postContactOperation,
  changeFavoriteOperation,
  deleteContactOperation,
  updateContactOperation,
} from '../../redux/contacts/operations';
import { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { getContacts } from '../../redux/contacts/selectors';
import { FaHeart, FaPen, FaTrash } from 'react-icons/fa6';
import throttle from 'lodash.throttle';

const Homepage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    dispatch(getContactsOperation());
  }, [dispatch]);

  function onFormSubmit(e) {
    e.preventDefault();
    const name = e.currentTarget.name.value;
    const email = e.currentTarget.email.value;
    const phone = e.currentTarget.phone.value;

    const contact = { name, email, phone };
    console.log(contact);
    dispatch(postContactOperation(contact));
    onCloseModal();
  }

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
    <div className={css.wrapper}>
      <button className={css.addButton} type="button" onClick={onOpenModal}>
        Add Contact
      </button>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNameNames={{
          overlay: css.customOverlay,
          modal: css.customModal,
        }}
      >
        <form className={css.formModal} onSubmit={onFormSubmit}>
          <h2>Add contact</h2>
          <label className={css.inputDesc}>
            Name
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className={css.modalInput}
            />
          </label>
          <label className={css.inputDesc}>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className={css.modalInput}
            />
          </label>
          <label className={css.inputDesc}>
            Phone
            <input
              type="phone"
              name="phone"
              placeholder="Enter phone"
              className={css.modalInput}
            />
          </label>
          <button className={css.formButton} type="submit">
            Add
          </button>
        </form>
      </Modal>
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add contact"
      >
        <form className={css.formModal} onSubmit={onFormSubmit}>
          <button onClick={closeModal}>close</button>
          <h2>Add contact</h2>
          <input type="text" name="name" placeholder="name" />
          <input type="email" name="email" placeholder="email" />
          <input type="phone" name="phone" placeholder="phone" />
          <button className={css.formButton} type="submit">
            Add
          </button>
        </form>
      </Modal> */}
      <h2>List of contacts</h2>
      <ul className={css.listContacts}>{result}</ul>
    </div>
  );
};

export default Homepage;
