import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import style from './ContactList.module.scss';
import { getContactsItems, getFilterValue } from 'redux/contactsSlice';
import * as contactsOperation from '../../redux/contactsOperation';

const ContactList = () => {
  const dispatch = useDispatch();
  const contactsItems = useSelector(getContactsItems);
  const filter = useSelector(getFilterValue);

  useEffect(() => {
    dispatch(contactsOperation.getContacts());
  }, [dispatch]);

  const getFilteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contactsItems.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  const visibleContacts = getFilteredContacts();

  return (
    <ul className={style.list}>
      {visibleContacts.length !== 0 ? (
        visibleContacts.map(({ id, name, number }) => {
          return <ContactItem key={id} id={id} name={name} number={number} />;
        })
      ) : (
        <li className={style.error}>Not found name</li>
      )}
    </ul>
  );
};

export default ContactList;
