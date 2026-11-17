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
      .some(value => value.toLowerCase().includes(term));

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
    <main className="min-h-screen bg-gray-50 p-5 sm:p-8">
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
        <div className="mx-auto max-w-7xl space-y-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
              <p className="mt-1 text-gray-500">Manage your business contacts in one place.</p>
            </div>

            <button onClick={() => setPage("add")}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">
              <Plus size={18} /> Add Contact
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map(({ label, value, Icon }) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border bg-white p-5">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Icon size={23} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <section className="rounded-2xl border bg-white p-5">
            <h2 className="mb-5 text-lg font-semibold">All Contacts</h2>

            <ContactSearch
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
            />

            <ContactTable
              contacts={filtered}
              onView={contact => { setSelected(contact); setPage("details"); }}
              onEdit={contact => { setSelected(contact); setPage("edit"); }}
              onDelete={deleteContact}
            />
          </section>
        </div>
      )}
    </main>
  );
}
