import ContactForm from "../components/ContactForm";

export default function EditContact({ contact, onSave, onCancel }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Contact</h1>
      <ContactForm initialData={contact} onSubmit={onSave} onCancel={onCancel} />
    </div>
  );
}
