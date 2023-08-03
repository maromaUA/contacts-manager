import { Link } from 'react-router-dom';
import css from './confirmPage.module.scss';

const ConfirmPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.box}>
        <p>Succesfull email confirm.</p>
        <p>
          Now you can go on{' '}
          <span>
            <Link to="/">LOGIN</Link>
          </span>{' '}
          page.
        </p>
      </div>
    </div>
  );
};

export default ConfirmPage;
