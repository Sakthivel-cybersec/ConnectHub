import { useState } from "react";
import {
  UserRound,
  Bell,
  Palette,
  LockKeyhole,
} from "lucide-react";
import "./Settings.css";

export default function Settings({ theme, onThemeChange }) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);

  return (
    <main className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and application settings.</p>
      </div>

      <section className="settings-card">
        <div className="settings-card-heading">
          <UserRound size={21} />
          <div>
            <h2>Account Settings</h2>
            <p>Manage your account information.</p>
          </div>
        </div>

        <div className="settings-info">
          <span>Account Name</span>
          <strong>Admin User</strong>
        </div>

        <div className="settings-info">
          <span>Email Address</span>
          <strong>admin@connecthub.com</strong>
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-card-heading">
          <Bell size={21} />
          <div>
            <h2>Notification Preferences</h2>
            <p>Choose which notifications you want to receive.</p>
          </div>
        </div>

        <label className="settings-toggle-row">
          <span>
            <strong>Email Notifications</strong>
            <small>Receive updates through email.</small>
          </span>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(event) =>
              setEmailNotifications(event.target.checked)
            }
          />
        </label>

        <label className="settings-toggle-row">
          <span>
            <strong>System Notifications</strong>
            <small>Receive notifications inside ConnectHub.</small>
          </span>
          <input
            type="checkbox"
            checked={systemNotifications}
            onChange={(event) =>
              setSystemNotifications(event.target.checked)
            }
          />
        </label>
      </section>

      <section className="settings-card">
        <div className="settings-card-heading">
          <Palette size={21} />
          <div>
            <h2>Appearance</h2>
            <p>Choose your preferred display theme.</p>
          </div>
        </div>

        <div className="settings-theme-options">
          <button
            type="button"
            className={theme === "Light" ? "selected" : ""}
            onClick={() => onThemeChange("Light")}
          >
            Light
          </button>

          <button
            type="button"
            className={theme === "Dark" ? "selected" : ""}
            onClick={() => onThemeChange("Dark")}
          >
            Dark
          </button>
        </div>

        <p className="settings-theme-note">
          Selected theme: {theme}.
        </p>
      </section>

      <section className="settings-card">
        <div className="settings-card-heading">
          <LockKeyhole size={21} />
          <div>
            <h2>Security</h2>
            <p>Password management.</p>
          </div>
        </div>

        <p className="settings-security-note">
          Password management will be available after backend authentication is connected.
        </p>
      </section>
    </main>
  );
}
