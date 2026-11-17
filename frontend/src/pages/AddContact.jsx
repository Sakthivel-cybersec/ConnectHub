import ContactForm from "../components/ContactForm";

export default function AddContact({ onAdd, onCancel }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Contact</h1>
      <p className="text-gray-500">Enter the contact information below.</p>
      <ContactForm onSubmit={onAdd} onCancel={onCancel} />
    </div>
  );
}
