import {useState} from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from 'redux/selectors';
import { addContact } from '../../redux/operations';
// import { selectContactsList } from "redux/selectors";
import { Notify } from 'notiflix';

import css from './contactForm.module.css'


function ContactForm() {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleNameChange = event => {
        setName(event.currentTarget.value)
    };

    const handleNumberChange = event => {
        setPhone( event.currentTarget.value );
    };

    const reset = () => {
        setName('');
        setPhone('');
    }

    const handleSubmit = event => {
        
        event.preventDefault();
        
        if (contacts) {
            const names = contacts.map(contact => contact.name);
    
            const lowerCaseName = name.toLowerCase();
            const lowerCaseNames = names.map(name => name.toLowerCase());
            if (lowerCaseNames.includes(lowerCaseName)) {
                Notify.failure(`${name} is already in contacts`);
                return;
            }
    
            const contact = { id: nanoid(), name: name, phone: phone };
            dispatch(addContact(contact));
    
        }
        else {
            const contact = { id: nanoid(), name: name, phone: phone };
                console.log(contact)
            dispatch(addContact(contact));
        }
        reset();
    };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <label className={css.label}>Name</label>
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleNameChange}
                    value={name}
                    className={css.input}
                />
            
            <label className={css.label}>Phone</label>
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleNumberChange}
                    value={phone}
                    className={css.input}
            />
            
            <button type="submit" className={css.addButton}>Add contact</button>
        </form>
    )
}

export default ContactForm;