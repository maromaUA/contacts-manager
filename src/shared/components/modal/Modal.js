import { useEffect } from 'react';
import css from './Modal.module.scss';

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', onCloseEscape);
    return () => {
      document.removeEventListener('keydown', onCloseEscape);
    };
  });

  const handleOnClick = () => {
    onClose();
  };
  const handleBackDropClick = e => {
    e.currentTarget === e.target && onClose();
  };
  const onCloseEscape = e => {
    e.code === 'Escape' && onClose();
  };
  return (
    <div className={css.backdrop} onClick={handleBackDropClick}>
      <div className={css.modal}>
        {children}
        <span className={css.close} onClick={handleOnClick}></span>
      </div>
    </div>
  );
};

export default Modal;
