import { createSlice } from '@reduxjs/toolkit';
import {
  getContactsOperation,
  postContactOperation,
  deleteContactOperation,
} from './operations';

const contactsSlise = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [getContactsOperation.pending]: state => {
      state.isLoading = true;
    },
    [getContactsOperation.fulfilled]: (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
    },
    [getContactsOperation.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    // ======================================================
    [postContactOperation.pending]: state => {
      state.isLoading = true;
    },
    [postContactOperation.fulfilled]: (state, { payload }) => {
      state.items.push(payload);
      state.isLoading = false;
    },
    [postContactOperation.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    // ========================================================
    [deleteContactOperation.pending]: state => {
      state.isLoading = true;
    },
    [deleteContactOperation.fulfilled]: (state, { payload }) => {
      state.items = state.items.filter(contact => contact.id !== payload.id);
      state.isLoading = false;
    },
    [deleteContactOperation.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const contactsReducer = contactsSlise.reducer;