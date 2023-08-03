import { useState } from 'react';
import css from './SettingsForm.module.scss';
import { useDispatch } from 'react-redux';
import { changeSettingsOperation } from '../../redux/auth/operations';
import { FaFolderOpen } from 'react-icons/fa';
import RadioButtons from '../../shared/components/radioButtons/radioButtons';

const SettingsForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('event:', e.target);
    const data = new FormData(e.target);
    console.log(data);
    const result = await dispatch(changeSettingsOperation(data));
    console.log(result);
  };
  return (
    <form className={css.formSettings} onSubmit={handleSubmit}>
      <h3>Settings</h3>
      <label className={css.labelName}>
        Name
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          className={css.modalInput}
          // defaultValue={name}
        />
      </label>
      <label className={css.inputFile}>
        <FaFolderOpen size="30px" color="#92b0ec" /> <span>Change avatar</span>
        <input
          type="file"
          //onChange={handleAvatarChange}
          accept="image/*"
          name="avatar"
          className={css.hiddenInput}
        ></input>
      </label>
      <label className={css.radio} htmlFor="radioButtons">
        Subscription type{' '}
      </label>
      <RadioButtons
        id="radioButtons"
        name="subscription"
        first="STARTER"
        second="PRO"
        third="BUSSINESS"
      />
      <button className={css.formButton} type="submit">
        Save
      </button>
    </form>
  );
};

export default SettingsForm;
