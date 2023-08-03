import { Outlet } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, selectUser } from '../../redux/auth/selectors';
import {
  logOutOperation,
  changeThemeOperation,
} from '../../redux/auth/operations';
import css from './Layout.module.scss';
import { FaGear } from 'react-icons/fa6';
import { BsDoorOpenFill } from 'react-icons/bs';

import Modal from '../../shared/components/modal/Modal';
import ThemeSwitch from '../../shared/components/ThemeSwitch/ThemeSwitch';
import SettingsForm from '../FormModals/SettingsForm';

const Layout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { email, subscription, avatarURL, name } = user;

  const { REACT_APP_BACKEND_URL } = process.env;

  const [open, setOpen] = useState(false);

  const theme = useSelector(selectTheme);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onLogoutHandler = () => {
    dispatch(logOutOperation());
  };

  const handleTheme = theme => {
    console.log('theme:', theme);
    dispatch(changeThemeOperation({ theme }));
  };

  return email ? (
    <div
      id="wrapper"
      className={theme === 'light' ? css.wrapper : css.wrapperDark}
      data-theme={theme}
    >
      {open && (
        <Modal onClose={onCloseModal}>
          <SettingsForm />
        </Modal>
      )}

      <ThemeSwitch handleTheme={handleTheme} />
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
