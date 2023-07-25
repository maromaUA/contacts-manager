import { useDispatch, useSelector } from 'react-redux';
import css from './homepage.module.css';
import {
  getContactsOperation,
  postContactOperation,
  changeFavoriteOperation,
} from '../../redux/contacts/operations';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getContacts } from '../../redux/contacts/selectors';
import { FaHeart, FaPen, FaTrash } from 'react-icons/fa6';

const Homepage = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const contacts = useSelector(getContacts);

  Modal.setAppElement('#root');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  useEffect(() => {
    dispatch(getContactsOperation());
  }, [dispatch]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    const name = e.currentTarget.name.value;
    const email = e.currentTarget.email.value;
    const phone = e.currentTarget.phone.value;

    const contact = { name, email, phone };
    console.log(contact);
    dispatch(postContactOperation(contact));
  }

  function onFavoriteHandler(id, favorite) {
    // const index = contactsArr.findIndex(contact => contact._id === id);
    // contactsArr[index].favorite = !favorite;
    const body = { favorite: !favorite };
    console.log(body);
    dispatch(changeFavoriteOperation({ id, body }));
  }

  const result = contacts.map(({ _id, name, email, phone, favorite }) => (
    <li key={_id} className={css.contact}>
      <div className={css.liContent}>
        <p>Name: {name}</p> <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </div>
      <ul className={css.liActions}>
        <li onClick={() => onFavoriteHandler(_id, favorite)}>
          <FaHeart
            color={favorite ? 'red' : 'gray'}
            border="black"
            size="25px"
          />
        </li>
        <li>
          <FaPen size="25px" />
        </li>
        <li>
          <FaTrash size="25px" />
        </li>
      </ul>
    </li>
  ));

  return (
    <div className={css.wrapper}>
      <button className={css.addButton} type="button" onClick={openModal}>
        Add Contact
      </button>
      <Modal
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
      </Modal>
      <h2>List of contacts</h2>
      <ul className={css.listContacts}>{result}</ul>
    </div>
  );
};

export default Homepage;
