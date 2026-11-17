import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ContactTable({ contacts, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            {["Contact", "Company", "Category", "Phone", "Status", "Actions"].map(item =>
              <th key={item} className="px-5 py-4 font-semibold">{item}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-5 py-4">
                <p className="font-semibold text-gray-800">{contact.name}</p>
                <p className="text-xs text-gray-500">{contact.email}</p>
              </td>
              <td className="px-5 py-4">{contact.company}</td>
              <td className="px-5 py-4">{contact.category}</td>
              <td className="px-5 py-4">{contact.phone}</td>
              <td className="px-5 py-4">
                <span className={`rounded-full px-3 py-1 text-xs ${contact.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                  {contact.status}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex gap-3">
                  <button title="View" onClick={() => onView(contact)}><Eye size={17}/></button>
                  <button title="Edit" onClick={() => onEdit(contact)}><Pencil size={17}/></button>
                  <button title="Delete" onClick={() => onDelete(contact.id)} className="text-red-500"><Trash2 size={17}/></button>
                </div>
              </td>
            </tr>
          ))}
          {contacts.length === 0 && (
            <tr><td colSpan="6" className="p-8 text-center text-gray-500">No contacts found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
