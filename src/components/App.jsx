import { useState, useEffect } from 'react';
import { PhoneSection } from './PhoneForm/PhoneForm';
import { ContactForm } from './Contacts/ContactSection';
import { FilterSection } from './Filter/Filter';
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from 'react-redux';
import { addContact, removeContact } from '../redux/contactSlice';
import { changeFiler } from '../redux/filterSlice';

export function App() {

  const dispatch = useDispatch();
  const contactsState = useSelector(state => state.contacts.items);
  const filterState = useSelector(state => state.filter);
  
  const onFormSubmit = ({ name, number }) => {
      const isNameOnList = contactsState.find(contact => contact.name.toLowerCase() === name.toLowerCase());
      if (isNameOnList) {
        alert(`${name} is already in contacts.`);
        return;
      }
        console.log(`added :>> ${name} with ${number}`);
        dispatch(addContact({ id: nanoid(), name, number }));
     };
  
  const deleteContact = (id) => {
    dispatch(removeContact(id));
  }

  const onChangeFilter = event => {
    dispatch(changeFiler(event.target.value));
  }

  const getFilteredContact = () => {
    const newContacts = contactsState.filter(contact =>
      contact.name.toString().toLowerCase().includes(filterState.toLowerCase()));
    return newContacts;
  }

    return (
      <>
        <h1 className='primaryTitle'>Phonebook</h1>
        <PhoneSection onSubmit={onFormSubmit} />
        <FilterSection title={"Find contacts by name"} value={filterState} onChange={onChangeFilter}/>
        <h2 className='secondaryTitle'>Contacts</h2>
        <ContactForm contacts={getFilteredContact()} onDeleteContact={deleteContact} />
        {/* {(contactsState.items.length === 0)
          ? (<h3 className='warningText'>No Contects in your PhoneBook</h3>)
          : (<ContactForm contacts={getFilteredContact()} onDeleteContact={deleteContact} />)} */}
      </>
    );
}

// const addContact = ({ name, number }) => {
  //   try {
  //     setContacts(contacts => {
  //     if (contacts.find(contact => (contact.name.toLowerCase() === name.toLowerCase()))) {
  //       alert(`${name} is already in contacts.`);
  //       return [...contacts];
  //     }
  //     else {
  //       const id = nanoid();
  //       return [...contacts, { id: id, name, number }];
  //     }
  //   })
      
  //   } catch (error) {
  //     console.log('error :>> ', error);
  //   }
  // };

  // const getFilteredContact = () => {
  //   const newContacts = contacts.filter(contact => contact.name.toString().toLowerCase().includes(filter));
  //   return newContacts;
  // }

  // const deleteContact = (id) => {
  //   const stateAfterRemove = contacts.filter(contact => contact.id !== id);
  //   setContacts(stateAfterRemove);
  // }