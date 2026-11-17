export default function CategoryTable({ contacts, emptyMessage = "No contacts match your filters." }) {
  return (
    <div className="ch-table-scroll">
      <table className="ch-table">
        <caption className="ch-visually-hidden">Contacts in the selected category</caption>
        <thead>
          <tr>
            <th scope="col">Contact</th>
            <th scope="col">Company</th>
            <th scope="col">Category</th>
            <th scope="col">Phone</th>
            <th scope="col">Location</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <strong>{contact.name}</strong>
                <span className="ch-table-secondary">{contact.email}</span>
              </td>
              <td>{contact.company}</td>
              <td>{contact.category}</td>
              <td>{contact.phone}</td>
              <td>{contact.location}</td>
              <td><span className={`ch-status ${contact.status === "Active" ? "is-active" : "is-inactive"}`}>{contact.status}</span></td>
            </tr>
          ))}
          {contacts.length === 0 && (
            <tr><td className="ch-empty-cell" colSpan={6}>{emptyMessage}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
