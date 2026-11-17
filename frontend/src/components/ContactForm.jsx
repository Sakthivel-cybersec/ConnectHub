import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  category: "Client",
  status: "Active",
};

export default function ContactForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => initialData || emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          ["name", "Full Name", "Enter full name"],
          ["email", "Email Address", "Enter email"],
          ["phone", "Phone Number", "Enter phone"],
          ["company", "Company", "Enter company"],
        ].map(([name, label, placeholder]) => (
          <div key={name}>
            <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
            <input
              required
              type={name === "email" ? "email" : "text"}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        ))}

        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>
          <select name="category" value={form.category} onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3">
            {["Employee", "Client", "Vendor", "Business Partner"].map(x =>
              <option key={x}>{x}</option>
            )}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Status</label>
          <select name="status" value={form.status} onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 text-white">
          Save Contact
        </button>
        <button type="button" onClick={onCancel} className="rounded-xl border px-6 py-3">
          Cancel
        </button>
      </div>
    </form>
  );
}
