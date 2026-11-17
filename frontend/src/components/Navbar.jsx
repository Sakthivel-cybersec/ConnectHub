import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Bell,
  UserRound,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import "./Navbar.css";

export default function Navbar({ pageTitle = "Dashboard" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleMenuNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

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

        <div className="navbar-profile-wrapper" ref={menuRef}>
          <button
            type="button"
            className="navbar-profile"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            <div className="navbar-avatar">AM</div>

            <div className="navbar-user-info">
              <strong>Admin User</strong>
              <small>Administrator</small>
            </div>

            <ChevronDown
              size={16}
              className={`navbar-profile-chevron ${
                menuOpen ? "open" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <div className="navbar-dropdown" role="menu">
              <div className="navbar-dropdown-heading">
                <strong>Admin User</strong>
                <small>admin@connecthub.com</small>
              </div>

              <button
                type="button"
                className="navbar-dropdown-item"
                role="menuitem"
                onClick={() => handleMenuNavigate("/profile")}
              >
                <UserRound size={18} />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                className="navbar-dropdown-item"
                role="menuitem"
                onClick={() => handleMenuNavigate("/settings")}
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>

              <div className="navbar-dropdown-divider" />

              <button
                type="button"
                className="navbar-dropdown-item navbar-dropdown-logout"
                role="menuitem"
                onClick={() => handleMenuNavigate("/login")}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
