import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteTicket, getTickets } from '../api/tickets';

const priorityLabels = { low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent' };

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadTickets() {
    setLoading(true);
    setError('');
    try {
      const response = await getTickets();
      setTickets(response.data);
    } catch {
      setError('We could not load the ticket queue. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadTickets(); }, []);

  const filteredTickets = useMemo(() => tickets.filter((ticket) => {
    const text = `${ticket.title} ${ticket.category} ${ticket.user_email}`.toLowerCase();
    return text.includes(query.toLowerCase());
  }), [tickets, query]);

  async function handleDelete(id) {
    if (!window.confirm('Delete this ticket? This cannot be undone.')) return;
    try {
      await deleteTicket(id);
      setTickets((current) => current.filter((ticket) => ticket.id !== id));
    } catch {
      setError('The ticket could not be deleted. Please try again.');
    }
  }

  const openCount = tickets.filter((ticket) => ticket.status === 'open').length;
  const activeCount = tickets.filter((ticket) => ticket.status === 'in-progress').length;

  return (
    <main className="page-shell">
      <section className="hero-panel compact-hero">
        <div>
          <p className="eyebrow">SUPPORT OVERVIEW</p>
          <h1>Make every request feel handled.</h1>
          <p className="hero-copy">Review incoming issues, keep priorities visible, and give every request a clear next step.</p>
        </div>
        <div className="hero-stats">
          <div><strong>{openCount}</strong><span>open tickets</span></div>
          <div><strong>{activeCount}</strong><span>in progress</span></div>
        </div>
      </section>

      <section className="content-card">
        <div className="split-heading">
          <div>
            <p className="eyebrow dark">YOUR QUEUE</p>
            <h2>Support tickets</h2>
            <p className="section-subtitle">Everything your team needs to follow up on.</p>
          </div>
          <div className="queue-actions">
            <input className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tickets..." aria-label="Search tickets" />
            <Link className="primary-button" to="/add">+ New ticket</Link>
          </div>
        </div>

        {error && <p className="form-alert" role="alert">{error}</p>}
        {loading ? <div className="feedback-state">Loading your queue...</div> : (
          <div className="ticket-list">
            {filteredTickets.map((ticket) => (
              <article className="ticket-row" key={ticket.id}>
                <div className="ticket-avatar">{ticket.title.slice(0, 1).toUpperCase()}</div>
                <div className="ticket-summary">
                  <Link to={`/tickets/${ticket.id}`}><h3>{ticket.title}</h3></Link>
                  <p>{ticket.user_email || 'No email provided'} · {ticket.category || 'General'}</p>
                </div>
                <span className={`ticket-badge priority-${ticket.priority}`}>{priorityLabels[ticket.priority] || ticket.priority}</span>
                <span className={`ticket-badge status-${ticket.status}`}>{ticket.status.replace('-', ' ')}</span>
                <Link className="ticket-view" to={`/tickets/${ticket.id}`}>View <span>→</span></Link>
                <button className="icon-button" onClick={() => handleDelete(ticket.id)} aria-label={`Delete ${ticket.title}`} type="button">×</button>
              </article>
            ))}
            {!filteredTickets.length && <div className="feedback-state"><span>—</span><h2>No tickets yet</h2><p>Open a ticket to start building your support queue.</p><Link className="primary-button" to="/add">Open a ticket</Link></div>}
          </div>
        )}
      </section>
    </main>
  );
}
