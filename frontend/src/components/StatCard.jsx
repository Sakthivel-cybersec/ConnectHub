export default function StatCard({ label, value, Icon }) {
  return (
    <article className="stat-card">
      {Icon && <Icon size={24} aria-hidden="true" />}
      <p>{label}</p>
      <h2>{value}</h2>
    </article>
  );
}
