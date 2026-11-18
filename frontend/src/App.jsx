import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Categories from "./pages/Categories";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import "./App.css";

function AppLayout({ theme, onThemeChange }) {
  const location = useLocation();
  const navigate = useNavigate();

  const pageNames = {
    "/dashboard": "Dashboard",
    "/contacts": "Contacts",
    "/categories": "Categories",
    "/reports": "Reports",
    "/profile": "My Profile",
    "/settings": "Settings",
  };

  const activePage = pageNames[location.pathname] || "Dashboard";

  const handleNavigate = (label) => {
    const routes = {
      Dashboard: "/dashboard",
      Contacts: "/contacts",
      Categories: "/categories",
      Reports: "/reports",
      Logout: "/login",
    };

    if (routes[label]) navigate(routes[label]);
  };

  return (
    <div className={`app-layout theme-${theme.toLowerCase()}`}>
      <Navbar pageTitle={activePage} />

      <div className="app-body">
        <Sidebar
          activeItem={activePage}
          onNavigate={handleNavigate}
        />

        <div className="app-main">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/settings"
              element={
                <Settings
                  theme={theme}
                  onThemeChange={onThemeChange}
                />
              }
            />
            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("connecthub-theme") || "Light"
  );

  useEffect(() => {
    localStorage.setItem("connecthub-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <AppLayout
              theme={theme}
              onThemeChange={setTheme}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
