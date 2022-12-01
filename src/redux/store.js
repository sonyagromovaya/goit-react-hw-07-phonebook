import { configureStore } from '@reduxjs/toolkit';
import { contactsSliceReducer } from './contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsSliceReducer,
  },
});
