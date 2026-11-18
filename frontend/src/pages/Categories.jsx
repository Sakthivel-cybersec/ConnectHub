import { useMemo, useState } from "react";
import { Search, Users, X } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import CategoryTable from "../components/CategoryTable";
import { useContacts } from "../context/ContactContext";
import { getCategoryCounts } from "../data/categoryData";

const styles = `
.ch-page{--ch-ink:#17243b;--ch-muted:#718096;--ch-line:#e7ecf3;--ch-blue:#3767d5;max-width:1240px;margin:0 auto;padding:38px 28px 56px;color:var(--ch-ink);font-family:Inter,ui-sans-serif,system-ui,sans-serif}
.ch-page *{box-sizing:border-box}.ch-page button,.ch-page input,.ch-page select{font:inherit}.ch-page button:focus-visible,.ch-page input:focus-visible,.ch-page select:focus-visible{outline:3px solid #9bb9ff;outline-offset:2px}
.ch-page-header{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:26px}.ch-eyebrow{margin:0 0 8px;color:#5574ad;font-size:11px;font-weight:800;letter-spacing:.13em;text-transform:uppercase}.ch-page h1{margin:0;color:#17243b;font-size:30px;letter-spacing:-.04em}.ch-lede{margin:8px 0 0;color:var(--ch-muted);font-size:14px}.ch-total-pill{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid var(--ch-line);border-radius:12px;background:#fff;color:#42516a;font-size:13px;font-weight:700;white-space:nowrap}
.ch-category-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:24px}.ch-category-card{display:flex;align-items:flex-start;gap:12px;min-height:112px;padding:17px 15px;border:1px solid var(--ch-line);border-radius:16px;background:#fff;text-align:left;cursor:pointer;transition:border-color .18s,box-shadow .18s,transform .18s}.ch-category-card:hover{transform:translateY(-2px);box-shadow:0 10px 26px #233b6010}.ch-category-card.is-selected{border-color:#6c92ee;box-shadow:0 0 0 3px #3767d51a}.ch-category-icon{display:grid;place-items:center;width:39px;height:39px;flex:0 0 auto;border-radius:12px}.ch-tone-blue .ch-category-icon{background:#eaf1ff;color:#3767d5}.ch-tone-violet .ch-category-icon{background:#f1edff;color:#7359c7}.ch-tone-amber .ch-category-icon{background:#fff4df;color:#b87918}.ch-tone-green .ch-category-icon{background:#e7f7ef;color:#25865b}.ch-category-copy{display:flex;flex:1;flex-direction:column;gap:5px;min-width:0}.ch-category-name{font-size:13px;font-weight:750}.ch-category-description{color:var(--ch-muted);font-size:11px;line-height:1.45}.ch-category-count{color:#263750;font-size:18px;font-weight:800}.ch-panel{overflow:hidden;border:1px solid var(--ch-line);border-radius:17px;background:#fff}.ch-panel-head{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 22px;border-bottom:1px solid #edf0f5}.ch-panel-title{margin:0;font-size:16px;font-weight:750}.ch-panel-subtitle{margin:5px 0 0;color:var(--ch-muted);font-size:12px}.ch-toolbar{display:flex;gap:10px;padding:16px 22px}.ch-search{position:relative;flex:1;max-width:440px}.ch-search svg{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#8491a4}.ch-search input,.ch-filter{height:42px;border:1px solid #dfe5ee;border-radius:10px;background:#fff;color:#31405a}.ch-search input{width:100%;padding:0 38px 0 38px}.ch-filter{padding:0 34px 0 12px}.ch-clear{position:absolute;right:8px;top:8px;display:grid;place-items:center;width:26px;height:26px;border:0;border-radius:6px;background:transparent;color:#748197}.ch-table-scroll{overflow-x:auto}.ch-table{width:100%;min-width:790px;border-collapse:collapse;text-align:left;font-size:12px}.ch-table th{padding:12px 17px;background:#f8f9fc;color:#7b879a;font-size:10px;font-weight:750;letter-spacing:.06em;text-transform:uppercase}.ch-table td{padding:14px 17px;border-top:1px solid #eff2f6;color:#45536a}.ch-table tbody tr:hover{background:#fafbfe}.ch-table td strong{display:block;margin-bottom:3px;color:#263750;font-size:12px}.ch-table-secondary{color:#8490a2;font-size:11px}.ch-status{display:inline-block;padding:5px 9px;border-radius:999px;font-size:10px;font-weight:700}.ch-status.is-active{background:#e8f7ee;color:#25865b}.ch-status.is-inactive{background:#f0f2f5;color:#768196}.ch-empty-cell{padding:42px!important;text-align:center;color:#778499!important}.ch-visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media(max-width:980px){.ch-category-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:620px){.ch-page{padding:26px 15px 40px}.ch-page-header{align-items:flex-start;flex-direction:column}.ch-page h1{font-size:26px}.ch-category-grid{gap:9px}.ch-category-card{min-height:110px;padding:13px 11px;gap:8px}.ch-category-description{font-size:10px}.ch-category-count{font-size:16px}.ch-panel-head{padding:17px}.ch-toolbar{padding:13px 17px;flex-direction:column}.ch-search{max-width:none}.ch-filter{width:100%}}
`;

export default function Categories() {
  const { contacts } = useContacts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categoryCounts = useMemo(() => getCategoryCounts(contacts), [contacts]);
  const filteredContacts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return contacts.filter((contact) => {
      const matchesCategory = selectedCategory === "All" || contact.category === selectedCategory;
      const matchesSearch = !query || [contact.name, contact.email, contact.company, contact.phone, contact.location]
        .some((value) => value.toLocaleLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [contacts, search, selectedCategory]);

  return (
    <main className="ch-page">
      <style>{styles}</style>
      <header className="ch-page-header">
        <div>
          <p className="ch-eyebrow">People directory</p>
          <h1>Categories</h1>
          <p className="ch-lede">Browse and organize contacts by their relationship to your business.</p>
        </div>
        <div className="ch-total-pill"><Users size={16} aria-hidden="true" />{contacts.length} contacts</div>
      </header>

      <section className="ch-category-grid" aria-label="Contact categories">
        {categoryCounts.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            selected={selectedCategory === category.name}
            onClick={() => setSelectedCategory((current) => current === category.name ? "All" : category.name)}
          />
        ))}
      </section>

      <section className="ch-panel" aria-labelledby="category-contacts-heading">
        <div className="ch-panel-head">
          <div>
            <h2 className="ch-panel-title" id="category-contacts-heading">
              {selectedCategory === "All" ? "All contacts" : `${selectedCategory} contacts`}
            </h2>
            <p className="ch-panel-subtitle">Showing {filteredContacts.length} of {contacts.length} contacts</p>
          </div>
        </div>
        <div className="ch-toolbar">
          <label className="ch-search">
            <span className="ch-visually-hidden">Search contacts</span>
            <Search size={17} aria-hidden="true" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, company..." />
            {search && <button className="ch-clear" type="button" aria-label="Clear search" onClick={() => setSearch("")}><X size={15} /></button>}
          </label>
          <label>
            <span className="ch-visually-hidden">Filter by category</span>
            <select className="ch-filter" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
              <option value="All">All categories</option>
              {categoryCounts.map(({ id, name }) => <option key={id} value={name}>{name}</option>)}
            </select>
          </label>
        </div>
        <CategoryTable contacts={filteredContacts} emptyMessage="No contacts found. Try a different search or category." />
      </section>
    </main>
  );
}
