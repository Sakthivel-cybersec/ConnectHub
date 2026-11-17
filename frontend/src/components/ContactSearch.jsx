import { Search } from "lucide-react";

export default function ContactSearch({ search, setSearch, category, setCategory }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 text-gray-400" size={19} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email or company..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}
        className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none">
        <option value="All">All Categories</option>
        <option>Employee</option>
        <option>Client</option>
        <option>Vendor</option>
        <option>Business Partner</option>
      </select>
    </div>
  );
}
