const Modal = () => {
  return (
    <div className={css.wrapper}>
      <form onSubmit={onFormSubmit}>
        <h2>Add contact</h2>
        <input type="text" name="name" placeholder="name" />
        <input type="email" name="email" placeholder="email" />
        <input type="phone" name="phone" placeholder="phone" />
        <button className={css.formButton} type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default Modal;
