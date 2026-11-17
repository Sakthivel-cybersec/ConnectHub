
import { Search } from "lucide-react";

export default function ContactSearch({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="search-row">
      <div className="search-input-wrapper">
        <Search size={18} />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email or company..."
          aria-label="Search contacts"
        />
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Filter contacts by category"
      >
        <option value="All">All Categories</option>
        <option value="Employee">Employee</option>
        <option value="Client">Client</option>
        <option value="Vendor">Vendor</option>
        <option value="Business Partner">Business Partner</option>
      </select>
    </div>
  );
}
