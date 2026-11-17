
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
    <div className="contacts-page">
      <button onClick={onBack} className="secondary-btn details-back">
        <ArrowLeft size={18} />
        Back to contacts
      </button>

      <div className="details-card">
        <div className="contacts-header">
          <div>
            <h1>{contact.name}</h1>
            <p>
              <span className={`status ${contact.status?.toLowerCase()}`}>
                {contact.status}
              </span>
            </p>
          </div>

          <button onClick={onEdit} className="primary-btn">
            Edit Contact
          </button>
        </div>

        <div className="details-grid">
          {fields.map(({ label, value, Icon }) => (
            <div key={label} className="details-item">
              <Icon size={20} />
              <div>
                <p>{label}</p>
                <strong>{value || "Not provided"}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
