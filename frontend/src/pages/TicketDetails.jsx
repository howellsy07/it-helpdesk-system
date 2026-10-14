import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTicket, updateTicket } from '../api/tickets';

export default function TicketDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchTicketDetails();
    }, [id]);

    const fetchTicketDetails = async () => {
        try {
            const response = await getTicket(id);
            setTicket(response.data);
        } catch (error) {
            console.error("Error retrieving ticket details:", error);
            alert("Could not load ticket details.");
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setUpdating(true);
        try {
            await updateTicket(id, { status: newStatus });
            setTicket({ ...ticket, status: newStatus }); // Update local view state
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Could not update ticket status.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading ticket details...</div>;
    if (!ticket) return <div style={{ padding: '40px', textAlign: 'center' }}>Ticket not found.</div>;

    // Badge styling rules based on priority strings
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'urgent': return { bg: '#fee2e2', text: '#991b1b', label: '🔴 Urgent' };
            case 'high': return { bg: '#ffedd5', text: '#c2410c', label: '🟠 High' };
            case 'medium': return { bg: '#e0f2fe', text: '#0369a1', label: '🔵 Medium' };
            default: return { bg: '#f3f4f6', text: '#374151', label: '⚪ Low' };
        }
    };

    const priorityBadge = getPriorityStyle(ticket.priority);

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <Link to="/" style={{ color: '#6366f1', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
                ← Back to Ticket Dashboard
            </Link>

            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                {/* Header Information */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f3f4f6', paddingBottom: '20px' }}>
                    <div>
                        <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 'bold' }}>TICKET #{ticket.id}</span>
                        <h1 style={{ marginTop: '5px', marginBottom: '10px', fontSize: '24px', color: '#111827' }}>{ticket.title}</h1>
                        <p style={{ margin: 0, fontSize: '14px', color: '#4b5563' }}>
                            <strong>Submitted by:</strong> {ticket.user_email || 'Anonymous User'}
                        </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', backgroundColor: priorityBadge.bg, color: priorityBadge.text }}>
                            {priorityBadge.label}
                        </span>
                        <div style={{ marginTop: '10px', fontSize: '12px', color: '#9ca3af' }}>
                            Created: {new Date(ticket.created_at).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {/* Main Body Description */}
                <div style={{ padding: '25px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <h3 style={{ marginTop: 0, color: '#374151' }}>Issue Description</h3>
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#4b5563', background: '#fafafa', padding: '15px', borderRadius: '6px', border: '1px solid #f3f4f6' }}>
                        {ticket.description}
                    </p>
                </div>

                {/* Administrative Controls */}
                <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', padding: '15px', borderRadius: '6px' }}>
                    <div>
                        <span style={{ display: 'block', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold' }}>Category</span>
                        <span style={{ fontSize: '15px', fontWeight: '500', color: '#111827' }}>{ticket.category ? ticket.category.toUpperCase() : 'GENERAL'}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label htmlFor="status-select" style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                            Update Ticket Status:
                        </label>
                        <select
                            id="status-select"
                            value={ticket.status}
                            onChange={handleStatusChange}
                            disabled={updating}
                            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', fontSize: '14px', cursor: 'pointer' }}
                        >
                            <option value="open">Open / New</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
