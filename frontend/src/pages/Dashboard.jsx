import { Building2, UserCheck, UserX, Users } from "lucide-react";
import { initialContacts } from "../data/contactData";
import StatCard from "../components/StatCard";
import "./Dashboard.css";

export default function Dashboard() {
  const totalContacts = initialContacts.length;

  const activeContacts = initialContacts.filter(
    (contact) => contact.status === "Active"
  ).length;

  const inactiveContacts = initialContacts.filter(
    (contact) => contact.status === "Inactive"
  ).length;

  const totalCompanies = new Set(
    initialContacts.map((contact) => contact.company)
  ).size;

  const stats = [
    { label: "Total Contacts", value: totalContacts, Icon: Users },
    { label: "Active Contacts", value: activeContacts, Icon: UserCheck },
    { label: "Inactive Contacts", value: inactiveContacts, Icon: UserX },
    { label: "Total Companies", value: totalCompanies, Icon: Building2 },
  ];

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin! Here's your ConnectHub overview.</p>
        </div>
      </header>

      <section className="dashboard-stats">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="dashboard-recent">
        <h2>Recent Contacts</h2>

        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {initialContacts.slice(0, 5).map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.company}</td>
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
