import { Users, Bell } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ pageTitle = "Dashboard" }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">
          <Users size={22} />
        </div>
        <span>ConnectHub</span>
      </div>

      <div className="navbar-right">
        <span className="navbar-page">{pageTitle}</span>

        <button
          type="button"
          className="navbar-notification"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        <div className="navbar-profile">
          <div className="navbar-avatar">AM</div>
          <div className="navbar-user-info">
            <strong>Admin User</strong>
            <small>Administrator</small>
          </div>
        </div>
      </div>
    </nav>
  );
}
