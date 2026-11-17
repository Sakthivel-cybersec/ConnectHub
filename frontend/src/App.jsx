import { useEffect, useState } from "react";
import { BarChart3, ContactRound, LayoutGrid } from "lucide-react";
import Categories from "./pages/Categories";
import Contacts from "./pages/Contacts";
import Reports from "./pages/Reports";
import "./App.css";

const pages = [
  { path: "/contacts", label: "Contacts", Icon: ContactRound },
  { path: "/categories", label: "Categories", Icon: LayoutGrid },
  { path: "/reports", label: "Reports", Icon: BarChart3 },
];

function getCurrentPath() {
  const path = window.location.pathname.replace(/\/$/, "") || "/contacts";
  return pages.some((page) => page.path === path) ? path : "/contacts";
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
    const syncPath = () => setCurrentPath(getCurrentPath());
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  const navigate = (event, path) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (window.location.pathname !== path) window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  return (
    <>
      <header className="app-header">
        <a className="app-brand" href="/contacts" onClick={(event) => navigate(event, "/contacts")}>
          <span className="app-brand-mark" aria-hidden="true"><ContactRound size={19} /></span>
          <span>ConnectHub</span>
        </a>
        <nav className="app-navigation" aria-label="Main navigation">
          {pages.map(({ path, label, Icon }) => (
            <a
              className="app-navigation-link"
              href={path}
              key={path}
              onClick={(event) => navigate(event, path)}
              aria-current={currentPath === path ? "page" : undefined}
            >
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </header>

      {currentPath === "/categories" ? <Categories /> : currentPath === "/reports" ? <Reports /> : <Contacts />}
    </>
  );
}
