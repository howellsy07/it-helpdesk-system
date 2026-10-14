import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createTicket } from '../api/tickets';

const initialForm = { title: '', description: '', priority: 'low', category: 'software', user_email: '' };

export default function AddTicket() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      await createTicket(form);
      navigate('/');
    } catch {
      setError('The ticket could not be saved. Please check your details and try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="page-shell narrow-shell">
      <Link className="back-button" to="/">← Back to dashboard</Link>
      <section className="form-card">
        <div className="section-heading">
          <span className="section-number">01</span>
          <div><p className="eyebrow dark">NEW REQUEST</p><h1>Open a support ticket</h1><p>Tell us what is happening and we will route it to the right person.</p></div>
        </div>
        <form className="medicine-form two-column" onSubmit={submit}>
          <label><span>Issue title</span><input name="title" required value={form.title} onChange={updateField} placeholder="e.g. Cannot connect to printer" /></label>
          <label><span>Your email</span><input type="email" name="user_email" required value={form.user_email} onChange={updateField} placeholder="you@company.com" /></label>
          <label><span>Category</span><select name="category" value={form.category} onChange={updateField}><option value="software">Software / Application</option><option value="hardware">Hardware / Devices</option><option value="network">Network / Wi-Fi</option><option value="bug">System bug report</option></select></label>
          <label><span>Priority</span><select name="priority" value={form.priority} onChange={updateField}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select></label>
          <label className="wide-field"><span>Description</span><textarea name="description" required rows="7" value={form.description} onChange={updateField} placeholder="Include what you expected, what happened, and any steps to reproduce it." /></label>
          {error && <p className="form-alert wide-field" role="alert">{error}</p>}
          <div className="form-actions wide-field"><Link className="secondary-button" to="/">Cancel</Link><button className="primary-button" disabled={saving} type="submit">{saving ? 'Saving...' : 'Submit ticket'}</button></div>
        </form>
      </section>
    </main>
  );
}
