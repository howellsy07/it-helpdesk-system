import React, { useState } from 'react';
import { createTicket } from '../api/tickets';
import { useNavigate } from 'react-router-dom';

export default function AddTicket() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'low',
        category: 'software',
        user_email: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTicket(formData);
            alert('Support ticket submitted successfully!');
            navigate('/'); // Redirect back to ticket dashboard
        } catch (error) {
            console.error("Error submitting ticket:", error);
            alert('Failed to submit ticket. Check backend logs.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'sans-serif' }}>
            <h2>Submit a Helpdesk Ticket</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Your Email Address</label>
                    <input type="email" name="user_email" required value={formData.user_email} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="user@company.com" />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Issue Title</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="e.g., Cannot connect to printer" />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Issue Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                        <option value="software">Software / Application</option>
                        <option value="hardware">Hardware / Devices</option>
                        <option value="network">Network / Wi-Fi</option>
                        <option value="bug">System Bug Report</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Priority Level</label>
                    <select name="priority" value={formData.priority} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                        <option value="low">Low (General Inquiry)</option>
                        <option value="medium">Medium (Standard Issue)</option>
                        <option value="high">High (Operations Blocked)</option>
                        <option value="urgent">Urgent (System Down!)</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Detailed Description</label>
                    <textarea name="description" required rows="5" value={formData.description} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Please provide step-by-step details of the problem..."></textarea>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" style={{ flex: 1, padding: '10px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Submit Ticket
                    </button>
                    <button type="button" onClick={() => navigate('/')} style={{ padding: '10px', background: '#f3f4f6', color: '#374151', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
