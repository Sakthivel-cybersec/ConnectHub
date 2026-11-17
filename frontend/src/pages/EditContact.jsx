
import ContactForm from "../components/ContactForm";

export default function EditContact({ contact, onSave, onCancel }) {
  return (
    <div className="contacts-page">
      <div className="contacts-header">
        <div>
          <h1>Edit Contact</h1>
          <p>Update the contact information below.</p>
        </div>
      </div>

      <ContactForm
        initialData={contact}
        onSubmit={onSave}
        onCancel={onCancel}
      />
    </div>
  );
}
