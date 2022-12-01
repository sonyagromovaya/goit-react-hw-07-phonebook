import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as contactsOperation from 'redux/contactsOperation';
import { Spinner } from '../Spinner/Spinner';
import style from './ContactItem.module.scss';
import { isLoading } from 'redux/contactsSlice';

const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const globalLoading = useSelector(isLoading);

  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (!globalLoading) {
      setLocalLoading(false);
    }
  }, [globalLoading]);

  const handleDeleteContact = contactId => {
    setLocalLoading(true);
    dispatch(contactsOperation.deleteContact(contactId));
  };

  return (
    <li className={style.item}>
      <span className={style.itemName}>{name}:</span>
      <span className={style.itemNumber}>{number}</span>
      <button
        type="button"
        onClick={() => handleDeleteContact(id)}
        className={style.delete_btn}
        disabled={localLoading}
      >
        {!localLoading ? 'Delete' : <Spinner size={20} />}
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;
