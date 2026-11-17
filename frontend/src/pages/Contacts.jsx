
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
  const [selectedId, setSelectedId] = useState(null);

  // Always get the latest contact data using its ID
  const selected = contacts.find(
    (contact) => contact.id === selectedId
  );

  const filtered = useMemo(() => {
    return contacts.filter((contact) => {
      const term = search.toLowerCase();

      const matches = [
        contact.name,
        contact.email,
        contact.company,
        contact.phone,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(term)
      );

      return (
        matches &&
        (category === "All" || contact.category === category)
      );
    });
  }, [contacts, search, category]);

  const addContact = (data) => {
    setContacts((prev) => [
      ...prev,
      { ...data, id: Date.now() },
    ]);

    setPage("list");
  };

  // Update contact using selected contact ID
  const saveContact = (data) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === selectedId
          ? { ...data, id: selectedId }
          : contact
      )
    );

    setPage("list");
  };

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts((prev) =>
        prev.filter((contact) => contact.id !== id)
      );

      if (selectedId === id) {
        setSelectedId(null);
        setPage("list");
      }
    }
  };

  const stats = [
    {
      label: "Total Contacts",
      value: contacts.length,
      Icon: Users,
    },
    {
      label: "Active Contacts",
      value: contacts.filter(
        (contact) => contact.status === "Active"
      ).length,
      Icon: UserCheck,
    },
    {
      label: "Companies",
      value: new Set(
        contacts.map((contact) => contact.company)
      ).size,
      Icon: Building2,
    },
  ];

  return (
    <main className="contacts-page">

      {/* Add Contact Page */}
      {page === "add" && (
        <AddContact
          onAdd={addContact}
          onCancel={() => setPage("list")}
        />
      )}

      {/* Edit Contact Page */}
      {page === "edit" && selected && (
        <EditContact
          contact={selected}
          onSave={saveContact}
          onCancel={() => setPage("list")}
        />
      )}

      {/* Contact Details Page */}
      {page === "details" && selected && (
        <ContactDetails
          contact={selected}
          onBack={() => setPage("list")}
          onEdit={() => setPage("edit")}
        />
      )}

      {/* Contacts Dashboard */}
      {page === "list" && (
        <>
          <header className="contacts-header">
            <div>
              <h1>Contact Management</h1>
              <p>
                Manage your business contacts in one place.
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() => setPage("add")}
            >
              <Plus size={18} />
              Add Contact
            </button>
          </header>

          {/* Contact Statistics */}
          <section className="stats-grid">
            {stats.map(({ label, value, Icon }) => (
              <article key={label} className="stat-card">
                <Icon size={24} />
                <p>{label}</p>
                <h2>{value}</h2>
              </article>
            ))}
          </section>

          {/* Contact List */}
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
              onView={(contact) => {
                setSelectedId(contact.id);
                setPage("details");
              }}
              onEdit={(contact) => {
                setSelectedId(contact.id);
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
