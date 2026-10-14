import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import TicketList from './pages/TicketList';
import AddTicket from './pages/AddTicket';
import TicketDetails from './pages/TicketDetails';
import AppShell from './components/AppShell';
import ProtectedRoute from './components/ProtectedRoute';


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route index element={<TicketList />} />
          <Route path="add" element={<AddTicket />} />
          <Route path="tickets/:id" element={<TicketDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}
