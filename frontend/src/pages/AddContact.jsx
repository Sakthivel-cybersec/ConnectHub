
import ContactForm from "../components/ContactForm";

export default function AddContact({ onAdd, onCancel }) {
  return (
    <main className="contacts-page">
      <header className="contacts-header">
        <div>
          <h1>Add New Contact</h1>
          <p>Enter the contact information below.</p>
        </div>
      </header>

      <ContactForm
        onSubmit={onAdd}
        onCancel={onCancel}
      />
    </main>
  );
}
