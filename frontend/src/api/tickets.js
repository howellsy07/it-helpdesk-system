import axios from 'axios';

// Change this URL if your local Laravel server runs on a different port
const API_URL = 'http://localhost:8000/api/tickets';

export const getTickets = () => axios.get(API_URL);
export const getTicket = (id) => axios.get(`${API_URL}/${id}`);
export const createTicket = (data) => axios.post(API_URL, data);
export const updateTicket = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteTicket = (id) => axios.delete(`${API_URL}/${id}`);
