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

function AppLayout() {
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
    <div className="app-layout">
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
            <Route path="/settings" element={<Settings />} />
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
