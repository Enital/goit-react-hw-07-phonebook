
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

import css from './app.module.css'

export default function App() {
  
  return (
    <div className={css.container}>
      <section className={css.section}>
        <h2 className={css.title}>Phone book</h2>
        <ContactForm className={css.form} />
      </section>
      <section className={css.section}>
        <Filter />
        <ContactList/>
      </section>
    </div>
  )
}