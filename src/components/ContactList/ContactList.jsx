import Loader from "components/Loader/Loader";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "redux/operations";
import { getIsLoading, getVisibleContacts } from "redux/selectors";
import css from './contactList.module.css'

function ContactList() {
    const dispatch = useDispatch();
    const contacts = useSelector(getVisibleContacts);
    const isLoading = useSelector(getIsLoading);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const deleteContactBtn = id => {
        dispatch(deleteContact(id));
        // getContacts();
    }
    
    return (
        <>
            {isLoading && <Loader />}
            <h2>Contacts</h2>
            <ul>
                {contacts.map(({ id, name, phone }) => {
                    return (<>
                        <li key={id} className={css.li}>
                            <div className={css.contact}>
                                <span className={css.contactName}>{name}</span>
                                <span>{phone}</span>
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

export default ContactList;