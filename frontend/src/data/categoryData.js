export const categories = [
  {
    id: "employee",
    name: "Employee",
    description: "People on your internal team.",
    icon: "users",
    color: "blue",
  },
  {
    id: "client",
    name: "Client",
    description: "Customers and organizations you serve.",
    icon: "briefcase",
    color: "violet",
  },
  {
    id: "vendor",
    name: "Vendor",
    description: "Suppliers supporting your operations.",
    icon: "building",
    color: "amber",
  },
  {
    id: "business-partner",
    name: "Business Partner",
    description: "Partners working alongside your business.",
    icon: "handshake",
    color: "green",
  },
];

export const categoryContacts = [
  { id: 1, name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 98765 43211", company: "ConnectHub", category: "Employee", status: "Active", location: "Bengaluru" },
  { id: 2, name: "Arjun Menon", email: "arjun.menon@example.com", phone: "+91 98765 43212", company: "ConnectHub", category: "Employee", status: "Active", location: "Chennai" },
  { id: 3, name: "Meera Nair", email: "meera.nair@example.com", phone: "+91 98765 43213", company: "ConnectHub", category: "Employee", status: "Active", location: "Kochi" },
  { id: 4, name: "Arun Kumar", email: "arun.kumar@example.com", phone: "+91 98765 43214", company: "Northstar Retail", category: "Client", status: "Active", location: "Chennai" },
  { id: 5, name: "Kavya Iyer", email: "kavya.iyer@example.com", phone: "+91 98765 43215", company: "Bluebird Health", category: "Client", status: "Active", location: "Hyderabad" },
  { id: 6, name: "Rahul Verma", email: "rahul.verma@example.com", phone: "+91 98765 43216", company: "Summit Learning", category: "Client", status: "Inactive", location: "Pune" },
  { id: 7, name: "Neha Patel", email: "neha.patel@example.com", phone: "+91 98765 43217", company: "Evergreen Supplies", category: "Vendor", status: "Active", location: "Ahmedabad" },
  { id: 8, name: "Vikram Das", email: "vikram.das@example.com", phone: "+91 98765 43218", company: "Metro Office Goods", category: "Vendor", status: "Active", location: "Kolkata" },
  { id: 9, name: "Ananya Rao", email: "ananya.rao@example.com", phone: "+91 98765 43219", company: "Cloudline Systems", category: "Vendor", status: "Inactive", location: "Bengaluru" },
  { id: 10, name: "Rohan Shah", email: "rohan.shah@example.com", phone: "+91 98765 43220", company: "Harbor Consulting", category: "Business Partner", status: "Active", location: "Mumbai" },
  { id: 11, name: "Divya Krishnan", email: "divya.krishnan@example.com", phone: "+91 98765 43221", company: "Brightpath Finance", category: "Business Partner", status: "Active", location: "Chennai" },
  { id: 12, name: "Sanjay Bose", email: "sanjay.bose@example.com", phone: "+91 98765 43222", company: "Pioneer Logistics", category: "Business Partner", status: "Active", location: "Delhi" },
];

export function getCategoryCounts(contacts = categoryContacts) {
  return categories.map((category) => ({
    ...category,
    count: contacts.filter((contact) => contact.category === category.name).length,
  }));
}

export function getReportSummary(contacts = categoryContacts) {
  const counts = getCategoryCounts(contacts);
  return {
    total: contacts.length,
    categories: counts.map(({ name, count }) => ({ name, count })),
  };
}
