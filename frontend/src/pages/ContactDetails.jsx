import { ArrowLeft, Mail, Phone, Building2, Tag } from "lucide-react";

export default function ContactDetails({ contact, onBack, onEdit }) {
  if (!contact) return null;

  const fields = [
    { label: "Email", value: contact.email, Icon: Mail },
    { label: "Phone", value: contact.phone, Icon: Phone },
    { label: "Company", value: contact.company, Icon: Building2 },
    { label: "Category", value: contact.category, Icon: Tag },
  ];

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500">
        <ArrowLeft size={18} /> Back to contacts
      </button>

      <div className="rounded-2xl border bg-white p-6">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{contact.name}</h1>
            <p className="text-gray-500">{contact.status}</p>
          </div>
          <button onClick={onEdit} className="rounded-xl bg-blue-600 px-5 py-3 text-white">
            Edit Contact
          </button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {fields.map(({ label, value, Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
