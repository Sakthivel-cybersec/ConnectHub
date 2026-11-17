
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ContactTable({
  contacts,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="table-wrap">
      <table className="contact-table">
        <thead>
          <tr>
            {["Contact", "Company", "Category", "Phone", "Status", "Actions"].map(item => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>
                <strong>{contact.name}</strong>
                <small>{contact.email}</small>
              </td>

              <td>{contact.company}</td>
              <td>{contact.category}</td>
              <td>{contact.phone}</td>

              <td>
                <span className={`status ${contact.status === "Active" ? "active" : "inactive"}`}>
                  {contact.status}
                </span>
              </td>

              <td>
                <div className="action-buttons">
                  <button
                    type="button"
                    title="View contact"
                    aria-label={`View ${contact.name}`}
                    onClick={() => onView(contact)}
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    type="button"
                    title="Edit contact"
                    aria-label={`Edit ${contact.name}`}
                    onClick={() => onEdit(contact)}
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    title="Delete contact"
                    aria-label={`Delete ${contact.name}`}
                    onClick={() => onDelete(contact.id)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {contacts.length === 0 && (
            <tr>
              <td colSpan={6}>No contacts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
