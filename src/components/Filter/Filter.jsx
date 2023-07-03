import { useDispatch, useSelector } from "react-redux";
import css from './filter.module.css';
import { filterContact } from 'redux/contactSlice';

function Filter() {
    const dispatch = useDispatch();
    const filter = useSelector(state=> state.filter)

    return (
        <>
            <h3>Find contacts by name</h3>
            <label>
                <input
                    type="text"
                    name='filter'
                    value={filter}
                    onChange={e => { dispatch(filterContact(e.target.value)) }}
                    className={css.input}
                />
            </label>
        </>
    )
};

export default Filter;