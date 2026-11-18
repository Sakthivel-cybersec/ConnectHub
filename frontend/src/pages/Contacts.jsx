
import { useMemo, useState } from "react";
import { Plus, Users, UserCheck, Building2 } from "lucide-react";
import { useContacts } from "../context/ContactContext";
import ContactTable from "../components/ContactTable";
import ContactSearch from "../components/ContactSearch";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactDetails from "./ContactDetails";

export default function Contacts() {
  const {
    contacts,
    addContact: addSharedContact,
    updateContact,
    deleteContact: deleteSharedContact,
  } = useContacts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState("list");
  const [selectedId, setSelectedId] = useState(null);

  // Always get the latest contact using its ID
  const selected = contacts.find(
    (contact) => contact.id === selectedId
  );

  // Search and category filtering
  const filtered = useMemo(() => {
    return contacts.filter((contact) => {
      const term = search.toLowerCase().trim();

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

  // Add contact through shared context
  const addContact = (data) => {
    addSharedContact(data);
    setPage("list");
  };

  // Update contact through shared context
  const saveContact = (data) => {
    updateContact(selectedId, data);
    setPage("list");
  };

  // Delete contact through shared context
  const deleteContact = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this contact?"
      )
    ) {
      deleteSharedContact(id);

      if (selectedId === id) {
        setSelectedId(null);
        setPage("list");
      }
    }
  };

  // Contact statistics from shared data
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
        contacts
          .map((contact) => contact.company)
          .filter(Boolean)
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
