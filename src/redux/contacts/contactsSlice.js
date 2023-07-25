import { createSlice } from '@reduxjs/toolkit';
import {
  getContactsOperation,
  postContactOperation,
  deleteContactOperation,
  updateContactOperation,
  changeFavoriteOperation,
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
      state.items = state.items.filter(contact => contact._id !== payload._id);
      state.isLoading = false;
    },
    [deleteContactOperation.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    [updateContactOperation.pending]: state => {
      state.isLoading = true;
    },
    [updateContactOperation.fulfilled]: (state, { payload }) => {
      const index = state.items.findIndex(
        contact => contact._id === payload._id
      );
      state.items[index] = payload;
      state.isLoading = false;
    },
    [updateContactOperation.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    [changeFavoriteOperation.pending]: state => {
      state.isLoading = true;
    },
    [changeFavoriteOperation.fulfilled]: (state, { payload }) => {
      const index = state.items.findIndex(
        contact => contact._id === payload._id
      );
      state.items[index].favorite = payload.favorite;
      state.isLoading = false;
    },
    [changeFavoriteOperation.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const contactsReducer = contactsSlise.reducer;
