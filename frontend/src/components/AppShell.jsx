import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function AppShell() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function signOut() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">IT</span>
          <span><strong>Helpdesk Hub</strong><small>IT support workspace</small></span>
        </NavLink>

        <nav aria-label="Main navigation">
          <NavLink end to="/" className={({ isActive }) => isActive ? 'active' : undefined}>Dashboard</NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? 'active' : undefined}>New ticket</NavLink>
        </nav>

        <button className="logout-button" onClick={signOut} type="button">Log out</button>
      </header>

      <Outlet />
    </div>
  );
}
