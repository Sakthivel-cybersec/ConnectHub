import { Building2, BriefcaseBusiness, Handshake, Users } from "lucide-react";

const iconMap = {
  users: Users,
  briefcase: BriefcaseBusiness,
  building: Building2,
  handshake: Handshake,
};

export default function CategoryCard({ category, selected = false, onClick }) {
  const Icon = iconMap[category.icon] ?? Users;

  return (
    <button
      type="button"
      className={`ch-category-card ch-tone-${category.color}${selected ? " is-selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`${category.name}: ${category.count} contacts`}
    >
      <span className="ch-category-icon"><Icon size={20} aria-hidden="true" /></span>
      <span className="ch-category-copy">
        <span className="ch-category-name">{category.name}</span>
        <span className="ch-category-description">{category.description}</span>
      </span>
      <span className="ch-category-count">{category.count}</span>
    </button>
  );
}
