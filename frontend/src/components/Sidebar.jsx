import {
  LayoutDashboard,
  Users,
  Tags,
  FileChartColumn,
  LogOut,
} from "lucide-react";

import "./Sidebar.css";

const menuItems = [
  { label: "Dashboard", Icon: LayoutDashboard },
  { label: "Contacts", Icon: Users },
  { label: "Categories", Icon: Tags },
  { label: "Reports", Icon: FileChartColumn },
];

export default function Sidebar({
  activeItem = "Dashboard",
  onNavigate = () => {},
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-heading">
        <h2>Workspace</h2>
        <p>Manage your workspace</p>
      </div>

      <nav className="sidebar-menu" aria-label="Main navigation">
        <span className="sidebar-section-title">MENU</span>

        {menuItems.map(({ label, Icon }) => (
          <button
            key={label}
            type="button"
            className={`sidebar-link ${
              activeItem === label ? "active" : ""
            }`}
            onClick={() => onNavigate(label)}
            aria-current={activeItem === label ? "page" : undefined}
          >
            <Icon size={19} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-link logout-link"
          onClick={() => onNavigate("Logout")}
        >
          <LogOut size={19} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
