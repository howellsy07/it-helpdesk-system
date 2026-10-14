import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const STORAGE_KEY = 'helpdesk-tickets';

function localTickets() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLocalTickets(tickets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function localResponse(data) {
  return { data };
}

export async function getTickets() {
  if (API_URL) return axios.get(`${API_URL}/tickets`);
  return localResponse(localTickets());
}

export async function getTicket(id) {
  if (API_URL) return axios.get(`${API_URL}/tickets/${id}`);
  const ticket = localTickets().find((item) => String(item.id) === String(id));
  if (!ticket) throw new Error('Ticket not found');
  return localResponse(ticket);
}

export async function createTicket(data) {
  if (API_URL) return axios.post(`${API_URL}/tickets`, data);
  const tickets = localTickets();
  const ticket = {
    ...data,
    id: Date.now(),
    status: 'open',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  saveLocalTickets([ticket, ...tickets]);
  return localResponse({ ticket });
}

export async function updateTicket(id, data) {
  if (API_URL) return axios.put(`${API_URL}/tickets/${id}`, data);
  const tickets = localTickets();
  const ticket = tickets.find((item) => String(item.id) === String(id));
  if (!ticket) throw new Error('Ticket not found');
  Object.assign(ticket, data, { updated_at: new Date().toISOString() });
  saveLocalTickets(tickets);
  return localResponse({ ticket });
}

export async function deleteTicket(id) {
  if (API_URL) return axios.delete(`${API_URL}/tickets/${id}`);
  saveLocalTickets(localTickets().filter((item) => String(item.id) !== String(id)));
  return localResponse({});
}
