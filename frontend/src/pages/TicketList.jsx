import React, { useEffect, useState } from 'react';
import { getTickets, deleteTicket } from '../api/tickets';
import { Link } from 'react-router-dom';

export default function TicketList() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await getTickets();
            setTickets(response.data);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this ticket?")) {
            try {
                await deleteTicket(id);
                fetchTickets(); // Refresh list
            } catch (error) {
                console.error("Error deleting ticket:", error);
            }
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Helpdesk Support Tickets</h2>
                <Link to="/add" style={{ padding: '8px 16px', background: '#6366f1', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                    + Open New Ticket
                </Link>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Title</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Category</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Priority</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Status</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>#{ticket.id}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                <strong>{ticket.title}</strong>
                                <div style={{ fontSize: '12px', color: '#6b7280' }}>{ticket.user_email}</div>
                            </td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{ticket.category || 'General'}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: ticket.priority === 'urgent' ? '#fee2e2' : '#f3f4f6', color: ticket.priority === 'urgent' ? '#991b1b' : '#374151' }}>
                                    {ticket.priority}
                                </span>
                            </td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: ticket.status === 'open' ? '#dcfce7' : '#e0f2fe', color: ticket.status === 'open' ? '#166534' : '#0369a1' }}>
                                    {ticket.status}
                                </span>
                            </td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                <Link to={`/tickets/${ticket.id}`} style={{ marginRight: '10px', color: '#2563eb' }}>View</Link>
                                <button onClick={() => handleDelete(ticket.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {tickets.length === 0 && (
                        <tr>
                            <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>No tickets found. You're all caught up!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
