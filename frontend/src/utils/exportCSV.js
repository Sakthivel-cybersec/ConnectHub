import { categories } from "../data/categoryData.js";

function escapeCSVValue(value) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function createCSV(headers, rows) {
  if (!Array.isArray(headers) || headers.length === 0 || !Array.isArray(rows) || rows.length === 0) {
    return "";
  }

  const lines = [headers, ...rows].map((row) => row.map(escapeCSVValue).join(","));
  return `\uFEFF${lines.join("\r\n")}`;
}

export function downloadCSV(filename, headers, rows) {
  const csv = createCSV(headers, rows);
  if (!csv || typeof document === "undefined" || typeof URL?.createObjectURL !== "function") {
    return false;
  }

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return true;
}

export function exportContactsCSV(contacts) {
  const rows = contacts.map(({ name, email, phone, company, category, status, location }) =>
    [name, email, phone, company, category, status, location]);
  return downloadCSV("connecthub-contacts.csv", ["Name", "Email", "Phone", "Company", "Category", "Status", "Location"], rows);
}

export function exportCategoriesCSV(contacts) {
  const rows = categories.map(({ name, description }) => [
    name,
    description,
    contacts.filter((contact) => contact.category === name).length,
  ]);
  return downloadCSV("connecthub-categories.csv", ["Category", "Description", "Contact count"], rows);
}

export function exportReportSummaryCSV(summary) {
  const rows = [["All contacts", summary.total], ...summary.categories.map(({ name, count }) => [name, count])];
  return downloadCSV("connecthub-contact-report.csv", ["Group", "Contact count"], rows);
}
