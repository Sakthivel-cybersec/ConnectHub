
import { useMemo, useState } from "react";
import { Plus, Users, UserCheck, Building2 } from "lucide-react";
import { initialContacts } from "../data/contactData";
import ContactTable from "../components/ContactTable";
import ContactSearch from "../components/ContactSearch";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactDetails from "./ContactDetails";

export default function Contacts() {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState("list");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => contacts.filter(contact => {
    const term = search.toLowerCase();
    const matches = [contact.name, contact.email, contact.company, contact.phone]
      .some(value => String(value ?? "").toLowerCase().includes(term));

    return matches && (category === "All" || contact.category === category);
  }), [contacts, search, category]);

  const addContact = (data) => {
    setContacts(prev => [...prev, { ...data, id: Date.now() }]);
    setPage("list");
  };

  const saveContact = (data) => {
    setContacts(prev => prev.map(c =>
      c.id === selected.id ? { ...data, id: selected.id } : c
    ));
    setSelected(null);
    setPage("list");
  };

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts(prev => prev.filter(c => c.id !== id));
    }
  };

  const stats = [
    { label: "Total Contacts", value: contacts.length, Icon: Users },
    { label: "Active Contacts", value: contacts.filter(c => c.status === "Active").length, Icon: UserCheck },
    { label: "Companies", value: new Set(contacts.map(c => c.company)).size, Icon: Building2 },
  ];

  return (
    <main className="contacts-page">
      {page === "add" && (
        <AddContact onAdd={addContact} onCancel={() => setPage("list")} />
      )}

      {page === "edit" && selected && (
        <EditContact contact={selected} onSave={saveContact} onCancel={() => setPage("list")} />
      )}

      {page === "details" && selected && (
        <ContactDetails
          contact={selected}
          onBack={() => setPage("list")}
          onEdit={() => setPage("edit")}
        />
      )}

      {page === "list" && (
        <>
          <header className="contacts-header">
            <div>
              <h1>Contact Management</h1>
              <p>Manage your business contacts in one place.</p>
            </div>

            <button className="primary-btn" onClick={() => setPage("add")}>
              <Plus size={18} /> Add Contact
            </button>
          </header>

          <section className="stats-grid">
            {stats.map(({ label, value, Icon }) => (
              <article key={label} className="stat-card">
                <Icon size={24} />
                <p>{label}</p>
                <h2>{value}</h2>
              </article>
            ))}
          </section>

          <section className="contact-section">
            <h2>All Contacts</h2>

            <ContactSearch
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
            />

            <ContactTable
              contacts={filtered}
              onView={contact => {
                setSelected(contact);
                setPage("details");
              }}
              onEdit={contact => {
                setSelected(contact);
                setPage("edit");
              }}
              onDelete={deleteContact}
            />
          </section>
        </>
      )}
    </main>
  );
}

