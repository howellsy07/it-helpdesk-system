import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketList from './pages/TicketList';
import AddTicket from './pages/AddTicket';
import TicketDetails from './pages/TicketDetails'; 


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TicketList />} />
                <Route path="/add" element={<AddTicket />} />
                <Route path="/tickets/:id" element={<TicketDetails />} />
            </Routes>
        </Router>
    );
}
