import {
  Users,
  UserRound,
  Briefcase,
  Building2,
  Handshake,
  Activity,
} from "lucide-react";

import {
  categoryContacts,
  getCategoryCounts,
} from "../data/categoryData";

import StatCard from "../components/StatCard";
import "./Dashboard.css";

export default function Dashboard() {
  const categoryCounts = getCategoryCounts(categoryContacts);

  const getCount = (categoryName) =>
    categoryContacts.filter(
      (contact) => contact.category === categoryName
    ).length;

  const stats = [
    { label: "Total Contacts", value: categoryContacts.length, Icon: Users },
    { label: "Employees", value: getCount("Employee"), Icon: UserRound },
    { label: "Clients", value: getCount("Client"), Icon: Briefcase },
    { label: "Vendors", value: getCount("Vendor"), Icon: Building2 },
    {
      label: "Business Partners",
      value: getCount("Business Partner"),
      Icon: Handshake,
    },
  ];

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin! Here's your ConnectHub overview.</p>
        </div>
      </header>

      <section className="dashboard-stats" aria-label="Contact summary">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="dashboard-content-grid">
        <div className="dashboard-panel dashboard-category-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Category Overview</h2>
              <p>Contacts grouped by category</p>
            </div>
          </div>

          <div className="dashboard-category-list">
            {categoryCounts.map((category) => (
              <article
                className="dashboard-category-item"
                key={category.id}
              >
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                <strong>{category.count}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="dashboard-panel dashboard-activity-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest workspace updates</p>
            </div>
            <Activity size={21} aria-hidden="true" />
          </div>

          <div className="dashboard-activity-empty">
            <Activity size={30} aria-hidden="true" />
            <h3>No activity available</h3>
            <p>
              Activity updates will appear here when activity tracking
              is connected.
            </p>
          </div>
        </div>
      </section>

      <section className="dashboard-recent">
        <div className="dashboard-panel-header">
          <div>
            <h2>Recent Contacts</h2>
            <p>Sample contacts from your workspace</p>
          </div>
          <span className="dashboard-record-count">
            {categoryContacts.length} contacts
          </span>
        </div>

        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {categoryContacts.slice(0, 5).map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.company}</td>
                  <td>{contact.category}</td>
                  <td>
                    <span
                      className={`dashboard-status ${
                        contact.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
