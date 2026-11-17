import { Activity, BriefcaseBusiness, Building2, Handshake, Users } from "lucide-react";

const icons = [Users, Users, BriefcaseBusiness, Building2, Handshake];

export default function ReportSummary({ summary }) {
  const metrics = [
    { label: "Total contacts", value: summary.total },
    ...summary.categories.map(({ name, count }) => ({ label: name, value: count })),
  ];

  return (
    <section className="ch-summary-grid" aria-label="Contact totals">
      {metrics.map(({ label, value }, index) => {
        const Icon = icons[index] ?? Activity;
        return (
          <article className="ch-summary-card" key={label}>
            <span className={`ch-summary-icon ch-summary-icon-${index}`}><Icon size={19} aria-hidden="true" /></span>
            <span className="ch-summary-label">{label}</span>
            <strong className="ch-summary-value">{value}</strong>
          </article>
        );
      })}
    </section>
  );
}
