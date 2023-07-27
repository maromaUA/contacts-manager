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
import { FaFolderOpen } from 'react-icons/fa';

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
    <div classNameName={css.wrapper}>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNameNames={{
          overlay: css.customOverlay,
          modal: css.customModal,
        }}
      >
        <form className={css.formSettings} onSubmit={handleSubmit}>
          <h2>Settings</h2>

          <label>
            <span className={css.inputDesc}>Name</span>
            <input
              className={css.modalInput}
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={name}
            />
          </label>
          <label className={css.inputFile}>
            <FaFolderOpen size="30px" color="#92b0ec" />{' '}
            <span>Change avatar</span>
            <input
              type="file"
              onChange={handleAvatarChange}
              accept="image/*"
              name="avatar"
              className={css.hiddenInput}
            ></input>
          </label>
          <div className={css.radioStart}>
            <label className="form-control">
              <input type="radio" name="subscription" value="starter" />
              Starter
            </label>
            <label className={css.radioPro}>
              <input type="radio" name="subscription" value="pro" />
              Pro
            </label>
            <label className={css.radioBusiness}>
              <input type="radio" name="subscription" value="business" />
              Business
            </label>
          </div>
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
        </li>
        {/*
            <button type="button" onClick={handleUpload}>
              Upload
            </button> */}

        <li className={css.userInfo}>
          <p className={css.headerName}>{name}</p>
          <p
            style={{
              color:
                (subscription === 'starter' && 'green') ||
                (subscription === 'pro' && 'blue') ||
                (subscription === 'business' && 'red'),
              fontWeight: 500,
            }}
          >
            {subscription.toUpperCase()}
          </p>
        </li>
        <li className={css.headerActions}>
          <span onClick={onOpenModal}>
            <FaGear color="#92b0ec" size="30px" />
          </span>
          <span onClick={onLogoutHandler}>
            <BsDoorOpenFill color="#92b0ec" size="30px" />
          </span>
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
