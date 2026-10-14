import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getTicket, updateTicket } from '../api/tickets';

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getTicket(id).then((response) => setTicket(response.data)).catch(() => {
      setError('This ticket could not be found.');
    }).finally(() => setLoading(false));
  }, [id]);

  async function changeStatus(event) {
    const status = event.target.value;
    setUpdating(true);
    try {
      const response = await updateTicket(id, { status });
      setTicket(response.data.ticket || { ...ticket, status });
    } catch {
      setError('The status could not be updated. Please try again.');
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return <main className="page-shell narrow-shell"><div className="feedback-state">Loading ticket...</div></main>;
  if (!ticket) return <main className="page-shell narrow-shell"><Link className="back-button" to="/">← Back to dashboard</Link><div className="feedback-state error"><h2>{error}</h2><button className="secondary-button" onClick={() => navigate('/')} type="button">Return to dashboard</button></div></main>;

  return (
    <main className="page-shell narrow-shell">
      <Link className="back-button" to="/">← Back to dashboard</Link>
      <section className="details-card">
        <div className="details-heading">
          <div><p className="eyebrow dark">TICKET #{ticket.id}</p><h1>{ticket.title}</h1><p className="muted">{ticket.user_email || 'No email provided'} · Created {new Date(ticket.created_at).toLocaleDateString()}</p></div>
          <span className={`ticket-badge priority-${ticket.priority}`}>{ticket.priority}</span>
        </div>
        {error && <p className="form-alert" role="alert">{error}</p>}
        <div className="ticket-description"><p className="eyebrow dark">DESCRIPTION</p><p>{ticket.description}</p></div>
        <div className="details-controls">
          <div><small>Category</small><strong>{ticket.category || 'General'}</strong></div>
          <label><span>Status</span><select value={ticket.status} onChange={changeStatus} disabled={updating}><option value="open">Open</option><option value="in-progress">In progress</option><option value="resolved">Resolved</option><option value="closed">Closed</option></select></label>
        </div>
      </section>
    </main>
  );
}
