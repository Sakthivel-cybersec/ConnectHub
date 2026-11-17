
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
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    ...initialData,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-grid">
        {[
          ["name", "Full Name", "Enter full name", "text"],
          ["email", "Email Address", "Enter email address", "email"],
          ["phone", "Phone Number", "Enter phone number", "tel"],
          ["company", "Company", "Enter company name", "text"],
        ].map(([name, label, placeholder, type]) => (
          <div key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              required
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
            />
          </div>
        ))}

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {["Employee", "Client", "Vendor", "Business Partner"].map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-btn">
          Save Contact
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="secondary-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
