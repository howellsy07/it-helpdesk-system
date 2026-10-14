import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketList from './pages/TicketList';
import AddTicket from './pages/AddTicket';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TicketList />} />
                <Route path="/add" element={<AddTicket />} />
            </Routes>
        </Router>
    );
}
