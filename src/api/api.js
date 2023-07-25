import axios from 'axios';

const CONTACTS_URL = '/api/contacts';

export const getContacts = () => {
  return axios.get(`${CONTACTS_URL}`);
};

export const addContact = data => {
  return axios.post(`${CONTACTS_URL}`, data);
};

export const deleteContact = id => {
  return axios.delete(`${CONTACTS_URL}/${id}`);
};

export const changeContact = (id, body) => {
  return axios.put(`${CONTACTS_URL}/${id}`, body);
};

export const changeFavorite = (id, body) => {
  return axios.patch(`${CONTACTS_URL}/${id}/favorite`, body);
};
