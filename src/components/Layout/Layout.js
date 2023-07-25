import { Outlet } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import {
  logOutOperation,
  changeSettingsOperation,
} from '../../redux/auth/operations';
import css from './Layout.module.css';
import { FaGear } from 'react-icons/fa6';
import { BsDoorOpenFill } from 'react-icons/bs';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Layout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { email, subscription, avatarURL, name } = user;
  const { REACT_APP_BACKEND_URL } = process.env;

  const [avatar, setAvatar] = useState(null);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onLogoutHandler = () => {
    dispatch(logOutOperation());
  };

  const handleAvatarChange = e => {
    setAvatar(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const result = await dispatch(changeSettingsOperation(data));
    console.log(result);
  };

  return email ? (
    <div className={css.wrapper}>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: css.customOverlay,
          modal: css.customModal,
        }}
      >
        <form className={css.formSettings} onSubmit={handleSubmit}>
          <h2>Settings</h2>
          <input type="text" name="name" placeholder="Name" />
          <div className={css.radioBox}>
            <label className="form-control">
              <input type="radio" name="subscription" value="starter" />
              Starter
            </label>
            <label className="form-control">
              <input type="radio" name="subscription" value="pro" />
              Pro
            </label>
            <label className="form-control">
              <input type="radio" name="subscription" value="business" />
              Business
            </label>
          </div>
          <input
            type="file"
            onChange={handleAvatarChange}
            accept="image/*"
            name="avatar"
          ></input>
          <button className={css.formButton} type="submit">
            Save
          </button>
        </form>
      </Modal>
      <ul className={css.header}>
        <li>
          <img
            className={css.avatar}
            src={
              avatarURL.includes('gravatar')
                ? avatarURL
                : `${REACT_APP_BACKEND_URL}/${avatarURL}`
            }
            alt="avatar"
          ></img>
          {/*
          <button type="button" onClick={handleUpload}>
            Upload
          </button> */}
        </li>
        <li>
          <p>{name}</p>
          <p>{subscription}</p>
        </li>

        <li onClick={onOpenModal}>
          <FaGear color="#92b0ec" size="30px" />
        </li>
        <li onClick={onLogoutHandler}>
          <BsDoorOpenFill color="#92b0ec" size="30px" />
        </li>
      </ul>
      <Suspense>
        <Outlet></Outlet>
      </Suspense>
    </div>
  ) : (
    <div className={css.mainHeader}>
      <Suspense>
        <Outlet></Outlet>
      </Suspense>
    </div>
  );
};

export default Layout;
