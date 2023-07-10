import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';

const contacts = {
    items: [],
    isLoading: false,
    error: null,
};

const handlePending = state => {
    state.isLoading = true;
};

const handleFulfilled = (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.items = action.payload;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const handleFulfilledAdd = (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.items = [...state.items, action.payload];
};

const handleFulfilledDelete = (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.items = state.items.filter(contact => contact.id !== action.payload.id);
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: contacts,
    reducers: {
        
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, handleFulfilled)
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, handleFulfilledAdd)
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, handleFulfilledDelete)
            .addCase(deleteContact.rejected, handleRejected);
    },
});

export const contactsReducer = contactsSlice.reducer;