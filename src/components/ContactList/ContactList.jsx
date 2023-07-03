import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "redux/contactSlice";
import css from './contactList.module.css'

function ContactList() {
    const dispatch = useDispatch();

    const contacts = useSelector(state => state.contacts);
    const filter = useSelector(state=> state.filter)

    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    const deleteContactBtn = id => {
        dispatch(deleteContact(id));
    }
    
    if (contacts) {
        return (
            <>
                <h2>Contacts</h2>
                <ul>
                    {filteredContacts.map(({ id, name, number }) => {                    
                        return (<>
                                <li key={id} className={css.li}>
                                    <div className={css.contact}>
                                        <span className={css.contactName}>{name}</span>
                                        <span>{number}</span>
                                    </div>
                                    <button className={css.delete} type='button' onClick={() => deleteContactBtn(id)}>Delete contact</button>
                                </li>
                                
                            </>
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default ContactList;